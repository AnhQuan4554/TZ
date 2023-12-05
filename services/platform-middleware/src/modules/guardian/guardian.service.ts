import { Injectable } from '@nestjs/common';
import { makeGuardianRequest } from '@tymlez/backend-libs';
import { Method } from 'axios';
import { SettingService } from '../settings/setting.service';

@Injectable()
export class GuardianService {
  constructor(private readonly settingService: SettingService) {}

  async makeGuardianRequest<_, P>(
    endpoint: string,
    method: Method,
    payload?: P,
  ) {
    const clientName = await this.getCientName();

    return await makeGuardianRequest<any, any>(
      `bootstrap/${clientName}/${endpoint}`,
      method,
      payload,
    );
  }

  async makeGuardianRequestMrv<_, P>(
    endpoint: string,
    method: Method,
    payload?: P,
  ) {
    const clientName = await this.getCientName();

    return await makeGuardianRequest<any, any>(
      `track-and-trace/${endpoint}/${clientName}`,
      method,
      payload,
    );
  }

  async getSummary() {
    return await this.makeGuardianRequest(`summary`, 'get');
  }

  async makeGuardianRequestVerification(
    method: Method,
    id: string,
    page = 0,
    pageSize = 10,
    accumulativeFields: string[] = [],
    byPolicy = false,
    showVcRecords = true,
  ) {
    const clientName = await this.getCientName();
    if (byPolicy) {
      return await makeGuardianRequest<any, any>(
        `audit/${clientName}/vp-documents-by-policy/${id}?page=${page}&pageSize=${pageSize}&accumulativeFields=${accumulativeFields}&showVcRecords=${showVcRecords}`,
        method,
      );
    }

    return await makeGuardianRequest<any, any>(
      `audit/${clientName}/vp-documents/${id}`,
      method,
    );
  }

  private async getCientName() {
    return await this.settingService.getGuardianTenancyName();
  }

  public async getTokenMintValue() {
    return await this.settingService.getTokenMintValue();
  }

  public async getEnabledPolicyTags() {
    return await this.settingService.getEnablePolicyTags();
  }

  async makeGuardianRequestVpRecord(
    method: Method,
    policy: string,
    hash: string,
    accumulativeFields: string[] = [],
  ) {
    const clientName = await this.getCientName();

    return await makeGuardianRequest<any, any>(
      `audit/${clientName}/vp-document-by-hash/${policy}?hash=${hash}&accumulativeFields=${accumulativeFields}`,
      method,
    );
  }
}
