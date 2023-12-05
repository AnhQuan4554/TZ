import { Controller } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  NatsRecord,
  Payload,
} from '@nestjs/microservices';
import { withTransaction } from '@tymlez/backend-libs';
import { connect, headers, NatsConnection, StringCodec } from 'nats';
import { ExternalMessageEvents } from '../common';
import { IpfsService } from './ipfs.service';
import { StorageService } from './gcs.service';

const natServer = process.env.MQ_ADDRESS || 'nats://localhost:4222';

// to create a connection to a nats-server:

@Controller()
export class IpfsController {
  nc: NatsConnection;

  constructor(
    private readonly logger: PinoLogger,
    private readonly ipfsService: IpfsService,
    private readonly storageService: StorageService,
  ) {
    this.logger.setContext('Guardian-ipfs');
  }

  async publish(data: any, messageId: string): Promise<void> {
    if (!this.nc) {
      this.nc = await connect({ servers: [natServer] });
    }
    const head = headers();
    head.append('messageId', messageId);
    head.set('chunks', '1');
    head.set('chunk', '1');

    await this.nc.publish(
      'response-message',
      StringCodec().encode(JSON.stringify(data)),
      {
        headers: head,
      },
    );
  }

  @MessagePattern(ExternalMessageEvents.IPFS_ADDED_FILE)
  async listenToIpfsAddedEvent(
    @Payload() info: any,
    @Ctx() context: NatsContext,
  ): Promise<any> {
    return withTransaction(
      'listenToIpfsAddedEvent',
      'guardian-events',
      async () => {
        try {
          await this.storageService.storeIpfs(info);
        } catch (err) {
          this.logger.error(
            { err, info },
            'Error to handle event listenToIpfsAddedEvent',
          );
        }

        await this.publish(
          { body: 'OK' },
          context.getHeaders().get('messageId'),
        );

        return new NatsRecord('OK', context.getHeaders());
      },
    );
  }

  @MessagePattern(ExternalMessageEvents.IPFS_BEFORE_UPLOAD_CONTENT)
  async responseToBeforeUploadEvent(
    @Payload() buffer: Buffer,
    @Ctx() context: NatsContext,
  ): Promise<NatsRecord> {
    const res = await withTransaction(
      'responseToBeforeUploadEvent',
      'guardian-events',
      async () => {
        try {
          return await this.ipfsService.encryptBuffer(buffer);
        } catch (err) {
          this.logger.error(err, 'Error to encrypt content');
        }

        return buffer;
      },
    );

    const natRes = new NatsRecord(res, context.getHeaders());
    await this.publish(
      { body: res.toString('base64') },
      context.getHeaders().get('messageId'),
    );
    return natRes;
  }

  @MessagePattern(ExternalMessageEvents.IPFS_AFTER_READ_CONTENT)
  async responseToAfterReadContent(
    @Payload() buffer: Buffer,
    @Ctx() context: NatsContext,
  ): Promise<NatsRecord> {
    const data = await withTransaction(
      'responseToAfterReadContent',
      'guardian-events',
      async () => {
        try {
          return this.ipfsService.decryptBuffer(buffer);
        } catch (err) {
          this.logger.error(err, 'Error to descryp content');
        }

        return buffer;
      },
    );

    const natRes = new NatsRecord(data, context.getHeaders());
    await this.publish(
      { body: data.toString('base64') },
      context.getHeaders().get('messageId'),
    );
    return natRes;
  }
}
