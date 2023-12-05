import { firstValueFrom } from 'rxjs';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type {
  ISite,
  UUID,
  IFindResult,
  IMeter,
  IMeterDataQuery,
  IMeterDataResult,
  IFindOneResult,
  IVerification,
  IVerificationQuery,
  ITenancy,
  ISetting,
} from '@tymlez/platform-api-interfaces';

@Injectable()
export class PlatformService {
  private readonly logger = new Logger(PlatformService.name);

  constructor(
    @Inject('PLATFORM_SERVICE') private platformClient: ClientProxy,
  ) {}

  async getSite(siteId: UUID): Promise<ISite | null> {
    const res = await this.platformClient.send<any>('site.getSite', siteId);
    const data = await firstValueFrom(res);
    this.logger.debug('getSite');

    return data;
  }

  async getSites(): Promise<IFindResult<ISite>> {
    const res = await this.platformClient.send<any>('site.getSites', '');
    const data = await firstValueFrom(res);
    this.logger.debug('getSite');

    return data;
  }

  async getMeterByKey(key: string): Promise<IFindOneResult<IMeter>> {
    const res = await this.platformClient.send<any>('meter.findOneByKey', key);
    const data = await firstValueFrom(res);
    this.logger.debug('getMeterByKey');

    return data;
  }

  async queryMeterData(query: IMeterDataQuery): Promise<IMeterDataResult[]> {
    const res = await this.platformClient.send<any>('meter-data.query', query);
    const data = await firstValueFrom(res);
    this.logger.debug('queryMeterData');

    return data;
  }

  async queryMeterDataPromise(
    queries: IMeterDataQuery[],
  ): Promise<IMeterDataResult[][]> {
    const requests = queries.map(async (query: IMeterDataQuery) => {
      return await this.queryMeterData(query);
    });

    return Promise.all(requests);
  }

  async getTenancies(): Promise<IFindResult<ITenancy>> {
    const res = await this.platformClient.send<any>(
      'tenancy.getAllTenancies',
      {},
    );
    const data = await firstValueFrom(res);
    return data;
  }

  async getSettingByNames(names: string[]): Promise<Array<string>> {
    const res = await this.platformClient.send<any>(
      'setting.getSettingByNames',
      { names },
    );
    const data = await firstValueFrom<ISetting[]>(res);
    return data.map((x) => x.value || '');
  }

  async getDatabaseVerification(
    query: IVerificationQuery,
  ): Promise<IVerification> {
    const res = await this.platformClient.send<any>(
      'verification.getDatabaseVerification',
      query,
    );
    return await firstValueFrom(res);
  }

  async validateToken(token: string): Promise<number> {
    const res = await this.platformClient.send<any>('auth.validateToken', {
      token,
    });
    return await firstValueFrom(res);
  }
}
