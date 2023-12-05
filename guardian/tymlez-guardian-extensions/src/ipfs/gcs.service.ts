/* eslint-disable no-param-reassign */
import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import {
  getIpfsContent,
  METRIC_NAMES,
  reportAPMMetric,
} from '@tymlez/backend-libs';
import { Storage } from '@google-cloud/storage';
import _ from 'lodash';

import {
  EntityRepository,
  UseRequestContext,
  MikroORM,
  EntityManager,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { runAllSettled } from '@tymlez/common-libs';
import { IpfsFile } from '../db/entities/ipfs-file.entity';
import { IFileAddedPayload } from './inteface';

/**
 * The ipfs storage service to save ipfs file produced by guardian into GCS
 */
@Injectable()
export class StorageService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    public readonly orm: MikroORM,
    private readonly em: EntityManager,
    private readonly logger: PinoLogger,
    @InjectRepository(IpfsFile)
    private readonly fileRepository: EntityRepository<IpfsFile>,
    private readonly configService: ConfigService,
  ) {
    this.logger.setContext(StorageService.name);
  }

  @UseRequestContext()
  async storeIpfs(payload: IFileAddedPayload) {
    let populaPayload = payload;

    this.logger.info({ payload }, 'Store item to file queue');

    if (typeof payload === 'string') {
      populaPayload = { cid: payload, url: `https://ipfs.io/ipfs/${payload}` };
    }

    const file = this.fileRepository.create({
      ...populaPayload,
      retries: 0,
      created: new Date(),
      status: 'queue',
    });
    await this.em.persistAndFlush(file);
    reportAPMMetric(METRIC_NAMES.IPFS_FILE_STORAGED, 1);
  }

  storeOnLocal(cid: string, content: any, meta: any = {}) {
    const localStorage =
      this.configService.get('LOCAL_STORAGE_PATH') || 'ipfs-data';

    const storageDir = `${localStorage}/${meta.issuer || 'unknown'}`;
    fs.mkdirSync(storageDir, { recursive: true });
    const path = `${storageDir}/${cid}.json`;
    fs.writeFileSync(path, content);
    return path;
  }

  async storeToGcs(cid: string, content: any, metadata: any = {}) {
    try {
      const rawConfig = this.configService.get('GCS_SERVICE_ACCOUNT');
      let serviceAccount = null;

      if (rawConfig) {
        serviceAccount = JSON.parse(
          Buffer.from(rawConfig, 'base64').toString(),
        );
      }

      const metadataFilePath = `${metadata.issuer || 'unknown'}/${new Date()
        .toISOString()
        .substr(0, 10)}.txt`;

      const bucketName = this.configService.get('GCS_BUCKET_NAME');
      const destFileName = cid;
      let storage: Storage;
      if (serviceAccount) {
        storage = new Storage({
          projectId: serviceAccount.project_id,
          scopes: 'https://www.googleapis.com/auth/cloud-platform',
          credentials: {
            client_email: serviceAccount.client_email,
            private_key: serviceAccount.private_key,
          },
        });
      } else {
        storage = new Storage();
      }
      let cidList = '';

      try {
        const contents = await storage
          .bucket(bucketName)
          .file(metadataFilePath)
          .download();
        cidList = contents.toString();
      } catch (err) {
        this.logger.warn({ err }, 'Metadata file update failed');
        // swallow this error
      }
      cidList += `${cid}\n`;

      await storage.bucket(bucketName).file(metadataFilePath).save(cidList);

      await storage
        .bucket(bucketName)
        .file(destFileName)
        .save(content, { metadata: { metadata } });

      return destFileName;
    } catch (err) {
      this.logger.error(err, 'Unable store file on GCS');
      throw err;
    }
  }

  @Cron('* * * * *', { name: 'storage-cron' })
  @UseRequestContext()
  async storeCronJob() {
    const job = await this.schedulerRegistry.getCronJob('storage-cron');
    job.stop();

    try {
      this.logger.info('Cron job running...');

      const pending = await this.fileRepository.find({
        status: 'queue',
        retries: {
          $lt: 60,
        },
      });

      const handleFile = async (item: IpfsFile) => {
        try {
          this.logger.info(`Processing ipfs file: ${item.cid}`);
          const started = new Date().getTime();

          const fileContent = await this.fetch(item);
          if (fileContent) {
            const output = await this.store(item, fileContent);

            item.status = 'stored';
            item.storedUrl = output;
            item.latency = new Date().getTime() - started;
            this.logger.info(`Mirrored ipfs file: ${item.cid}`);
            await this.em.persistAndFlush(item);
          }
        } catch (error) {
          this.logger.error(
            { error },
            `Unable to process file: ${item.cid} @ ${item.url}`,
          );

          item.retries = (item.retries || 0) + 1;
          item.error = error;
          await this.em.persistAndFlush(item);
        }
      };
      if (pending.length === 0) {
        this.logger.info('No pending IPFS file found');
      } else {
        this.logger.info('Found %s pending IPFS file', pending.length);
        await runAllSettled(_.shuffle(pending), (item) => handleFile(item), 2);
      }
    } catch (err) {
      this.logger.error({ err }, 'IPFS file cron execution failed');
    }
    job.start();
  }

  async store(file: IpfsFile, content: any) {
    let storePath = '';
    const storageMode = this.configService.get('STORAGE_PROVIDER') || 'local';
    const isJsonObject = !Buffer.isBuffer(content);
    const rawContent = isJsonObject ? JSON.stringify(content) : content;
    const metadata: any = {};

    if (isJsonObject) {
      metadata.issuer = content.issuer?.split(';')?.pop();
      metadata.type = content.type?.pop();
    }
    if (storageMode === 'local') {
      // store in the local directory
      storePath = await this.storeOnLocal(file.cid, rawContent, metadata);
    } else {
      storePath = await this.storeToGcs(file.cid, rawContent, metadata);
    }

    // update item to stored
    return storePath;
  }

  async fetch(file: IpfsFile) {
    const url = file.url || `https://ipfs.io/ipfs/${file.cid}`;
    try {
      this.logger.debug(`fetching data from ipfs: ${url}`);
      const rawContent = await getIpfsContent(url, 'buffer');
      try {
        const data = Buffer.from(rawContent, 'binary').toString();

        return JSON.parse(data);
      } catch (err) {
        //swallow
        // this.logger.warn({ err }, `Unable to parse file from ipfs: ${url}`);
      }
      return rawContent;
    } catch (err) {
      // swallow
      this.logger.error({ err }, `Unable to read file from ipfs: ${url}`);
      throw err;
    }
  }
}
