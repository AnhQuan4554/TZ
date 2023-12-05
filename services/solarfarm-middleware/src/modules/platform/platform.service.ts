import { firstValueFrom } from 'rxjs';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type {
  IMeterDataQuery,
  IMeterDataResult,
  IFindResult,
  ISetting,
  ISite,
  IVerificationQuery,
  IVerification,
  IVerificationDetailQuery,
  IVpRecord,
} from '@tymlez/platform-api-interfaces';

@Injectable()
export class PlatformService {
  constructor(
    @Inject('PLATFORM_SERVICE') private platformClient: ClientProxy,
  ) {}

  async getSettingByNames(names: string[]): Promise<Array<string>> {
    const res = await this.platformClient.send<any>(
      'setting.getSettingByNames',
      { names },
    );

    const data = await firstValueFrom<ISetting[]>(res);
    return data.map((x) => x.value || '');
  }

  async getSettingDataByNames(names: string[]): Promise<Array<any>> {
    const res = await this.platformClient.send<any>(
      'setting.getSettingByNames',
      { names },
    );

    const data = await firstValueFrom<ISetting[]>(res);
    return data;
  }

  async getSites(): Promise<IFindResult<ISite>> {
    const res = await this.platformClient.send<any>('site.getSites', '');
    return await firstValueFrom(res);
  }

  async queryMeterData(query: IMeterDataQuery): Promise<IMeterDataResult[]> {
    const res = await this.platformClient.send<any>('meter-data.query', query);
    return await firstValueFrom(res);
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

  async getDatabaseVpRecord(
    query: IVerificationDetailQuery,
  ): Promise<IVpRecord> {
    const res = await this.platformClient.send<any>(
      'verification.getDatabaseVpRecord',
      query,
    );
    return await firstValueFrom(res);
  }

  async getDatabaseVerificationCount(
    query: IVerificationQuery,
  ): Promise<number> {
    const res = await this.platformClient.send<any>(
      'verification.getDatabaseVerificationCount',
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
