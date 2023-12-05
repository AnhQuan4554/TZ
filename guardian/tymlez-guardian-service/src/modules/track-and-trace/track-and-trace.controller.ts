import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { IDevice, IPendingMrv } from '@tymlez/platform-api-interfaces';
import type { ProcessedMrv } from '../../schemas/processed-mrv.schema';
import { GenerateMvcDto } from './dto/mrv.dto';
import { TrackAndTraceService } from './track-and-trace.service';

@Controller('track-and-trace')
export class TrackAndTraceController {
  constructor(private readonly trackAndTraceService: TrackAndTraceService) {}

  @Get('/list-devices/:clientName/:policyTag')
  async listDeviceByPolicyTag(
    @Param('policyTag') policyTag: string,
    @Param('clientName') clientName: string,
  ): Promise<IDevice[]> {
    return await this.trackAndTraceService.listDeviceByPolicyTag(
      policyTag,
      clientName,
    );
  }

  @Get('/latest-mrv/:policyTag/:deviceId')
  async getLatestMrv(
    @Param('deviceId') deviceId: string,
    @Param('policyTag') policyTag: string,
  ): Promise<ProcessedMrv | null> {
    return await this.trackAndTraceService.getLatestMrv(policyTag, deviceId);
  }

  @Post('/generate-mrv/:clientName')
  async generateMrv(
    @Body() mrv: GenerateMvcDto,
    @Param('clientName') clientName: string,
  ): Promise<ProcessedMrv> {
    return (await this.trackAndTraceService.generateMrv(
      mrv,
      clientName,
    )) as any;
  }

  @Get('/pending-mrv/:clientName')
  async getPendingMrv(@Param('clientName') clientName: string): Promise<IPendingMrv[]> {
    return this.trackAndTraceService.countPendingMrv(clientName);
  }
}
