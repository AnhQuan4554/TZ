/* eslint-disable no-await-in-loop */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import addFormats from 'ajv-formats';
import Ajv from 'ajv';
import type { IDevice } from '@tymlez/platform-api-interfaces';
import promiseRetry from 'promise-retry';
import { getIpfsContent } from '@tymlez/backend-libs';
import { DeviceConfig } from '../../schemas/device-config.schema';
import { BaseService } from '../base.service';
import { ProcessedMrv } from '../../schemas/processed-mrv.schema';
import type { GenerateMvcDto } from './dto/mrv.dto';
import { VCDocumentLoader } from './documents/vc-document-loader';
import { BusinessException } from '../../common/exception';
import { TymlezUser } from '../../schemas/user.schema';
import type { IDeviceGrid } from '../../interfaces/block';

@Injectable()
export class TrackAndTraceService extends BaseService {
  @Inject('VCDocumentLoaderName') vcDocumentLoader: VCDocumentLoader;
  private readonly logger = new Logger(TrackAndTraceService.name);
  private readonly originalFieldsMapping = {
    originalCO2eqEmissions: 'CO2eqEmissions',
    originalCO2eqEmissionsReduction: 'CO2eqEmissionsReduction',
    originalValue: 'value',
  };

  private cache: any = {};
  constructor(
    @InjectConnection('guardian') private guardianConnection: Connection,
    @InjectModel(ProcessedMrv.name, 'tymlez')
    private processedMrvModel: Model<ProcessedMrv>,

    @InjectModel(DeviceConfig.name, 'tymlez')
    private deviceConfigModel: Model<DeviceConfig>,

    @InjectModel(TymlezUser.name, 'tymlez')
    userModel: Model<TymlezUser>,
  ) {
    super(userModel);
  }

  async listDeviceByPolicyTag(
    policyTag: string,
    clientName: string,
  ): Promise<IDevice[]> {
    const session = await this.loginAsRootAuthority(clientName);
    const publishedPolicy = await this.getPublishedPolicies(session);
    const policy = publishedPolicy.find((p) =>
      p.policyTag.includes(policyTag.replace('_', '')),
    );
    const gridData = await this.getPolicyBlockData<IDeviceGrid>(
      session,
      policy?.id || '',
      'device_grid',
    );
    return gridData.data.map((x) => x.document.credentialSubject[0]);
  }

  async getLatestMrv(policyTag: string, deviceId: string) {
    const mrv = await this.processedMrvModel.findOne({
      policyTag,
      deviceId,
      order: { timestamp: 'DESC' },
    });
    if (!mrv) {
      throw new BusinessException(404, {
        message: 'No mrv found ',
        deviceId,
        policyTag,
      });
    }
    return mrv;
  }

  async countPendingMrv(clientName: string) {
    const session = await this.loginAsRootAuthority(clientName);
    const policies = await this.getPublishedPolicies(session);
    const result: Array<{ id: string; tag: string; count: number }> = [];
    const collection = this.guardianConnection.collection('aggregate_vc');
    for await (const policy of policies) {
      const count = await collection.countDocuments({
        policyId: policy.id || '',
      });
      result.push({
        id: policy.id as string,
        tag: policy.policyTag,
        count,
      });
    }
    return result;
  }

  async generateMrv(mrv: GenerateMvcDto, clientName: string) {
    this.logger.log({ mrv }, 'Generate MRV');
    const { data, deviceId, policyTag: inputPolicyTag } = mrv;
    const deviceConfig = await this.deviceConfigModel.findOne({
      clientName,
      deviceId,
      policyTag: { $regex: `${clientName}.${inputPolicyTag.replace('_', '')}` },
    });

    if (!deviceConfig?.config) {
      this.logger.error('No device found');
      throw new BusinessException(400, {
        deviceId,
        clientName,
        message: `Cannot find device config for ${deviceId}`,
      });
    }
    const installer = await this.userModel.findOne({
      did: deviceConfig?.config.installer,
    });

    const mrvKey = `${inputPolicyTag}-${deviceConfig.key}-${data.readingId}-${data.intervalStartDateTime}-${data.intervalEndDateTime}`;
    const processedMrv = await this.processedMrvModel.findOne({ key: mrvKey });

    if (!installer?.username) {
      throw new BusinessException(400, {
        deviceId,
        message: `Can not find installer for device ${deviceId}`,
      });
    }

    if (processedMrv) {
      this.logger.log(`Skip because MRV ${mrvKey} already processed`);
      throw new BusinessException(422, {
        success: false,
        message: `Skip because MRV ${mrvKey} already processed`,
        data: processedMrv,
      });
    }
    const session = await this.loginAsUser(clientName, installer?.username);

    const {
      // topic,
      // hederaAccountId,
      // installer: installerDid,
      // hederaAccountKey,
      did,
      didDocument,
      policyId,
      schema,
      context,
      policyTag,
    } = deviceConfig.config || {};

    let document;
    let vc;
    let ownerDID = '';

    try {
      const owner = await this.loginAsUser(clientName, `${clientName}-owner`);
      const ownerProfile = await this.profile(owner);

      if (!ownerProfile?.did) {
        throw new BusinessException(
          422,
          'Owner profile has not been setup for client',
        );
      }
      ownerDID = ownerProfile.did;

      const publishedPolicy = await this.getPublishedPolicies(owner);
      const policy = publishedPolicy.find((x) => x.id === policyId);

      const schemas = await this.api
        .schema()
        .getAllByTopicId(owner, policy?.topicId || '');
      const MRV: any = schemas.find((x) => x.name === 'MRV');
      const schemaUrl = MRV?.documentURL || '';

      const schemaJson: any =
        this.cache[schemaUrl] || (await getIpfsContent(schemaUrl, 'json'));

      this.cache[schemaUrl] = schemaJson;
      const dsType = schemaJson.properties.sourceData.items.$ref.replace(
        '#',
        '',
      );
      const tokenOwnerId = schemaJson.properties.tokenOwnerId
        ? ownerProfile.hederaAccountId
        : undefined;

      const dsWithContext = data.sourceData.map((x) => ({
        ...context,
        ...x,
        type: dsType,
      }));
      const vcSubject = {
        ...context,
        ...data,
        tokenOwnerId,
        deviceId: did,
        policyId,
        sourceData: dsWithContext,
      };

      // update original field with same fields name
      Object.entries(this.originalFieldsMapping).forEach(
        ([originalFieldName, fieldName]) => {
          if (schemaJson.properties[originalFieldName]) {
            vcSubject[originalFieldName] = vcSubject[fieldName];
          }
        },
      );

      // validate input with schema

      const ajv = new Ajv();
      addFormats(ajv);
      const validate = ajv.compile(schemaJson);
      const valid = validate(vcSubject);
      if (!valid) {
        this.logger.error(
          { error: validate.errors },
          'Schema validation error',
        );
        throw new BusinessException(400, {
          message: validate.errors,
        });
      }

      const createVC = async () => {
        this.vcDocumentLoader.setDocument(JSON.parse(schema));
        this.vcDocumentLoader.setContext(context);

        vc = await this.vcDocumentLoader.vcHelper.createVC(
          vcSubject,
          didDocument,
          did,
        );
        return vc;
      };

      await promiseRetry(
        (retry) => {
          return createVC().catch(retry);
        },
        { retries: 3 },
      ).then((newVC) => {
        document = newVC;
      });

      this.logger.log('created vc', JSON.stringify(document, null, 2));
    } catch (error) {
      this.logger.error({ error }, 'Unable to generate vc');
      throw error;
    }

    const body = {
      document,
      owner: ownerDID,
      policyTag,
    };

    this.logger.log(
      `Sending MRV to guardian via external data api , policyTag = ${policyTag}`,
    );

    const result = await this.api.external().send(session, body as any);

    this.logger.log('Created VP document request result', result);

    const toBeInserted = {
      _id: new Types.ObjectId(),
      key: mrvKey,
      client: clientName,
      installer: session.username,
      deviceId,
      policyTag,
      timestamp: `${data.intervalStartDateTime}-${data.intervalEndDateTime}`,
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    const mrvStored = await this.processedMrvModel.create(toBeInserted);
    return {
      success: true,
      deviceDid: did,
      ownerDID,
      data: mrvStored,
    };
  }
}
