import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import type { IVpRecord } from '../../interfaces/IVpRecord';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(private service: AuditService) {}

  @Get('/:clientName/vp-documents/:deviceId')
  async getAudit(
    @Param('clientName') clientName: string,
    @Param('deviceId') deviceId: string,
    @Query('policyTag') policyTag: string,
    @Query('accumulativeFields') accumulativeFields: string,
  ): Promise<any> {
    return await this.service.getVpDocumentsByDeviceId(clientName, deviceId, {
      policyTag,
      accumulativeFields: accumulativeFields?.split(','),
    });
  }

  @Get('/:clientName/vp-documents-by-policy/:policyTag')
  async getAuditByPolicy(
    @Param('clientName') clientName: string,
    @Param('policyTag') policyTag: string,
    @Query('accumulativeFields') accumulativeFields: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('showVcRecords', new DefaultValuePipe(true), ParseBoolPipe)
    showVcRecords: boolean,
  ): Promise<{
    total: number;
    data: IVpRecord[];
  }> {
    return await this.service.getVpDocumentsByPolicy(clientName, policyTag, {
      page,
      pageSize,
      accumulativeFields: accumulativeFields?.split(','),
      showVcRecords,
    });
  }

  @Get('/:clientName/vp-document-by-hash/:policyTag')
  async getAuditByHash(
    @Param('clientName') clientName: string,
    @Param('policyTag') policyTag: string,
    @Query('accumulativeFields') accumulativeFields: string,
    @Query('hash') hash: string,
  ): Promise<IVpRecord> {
    return await this.service.getVpDocumentByHash(clientName, policyTag, {
      accumulativeFields: accumulativeFields?.split(','),
      hash,
    });
  }
}
