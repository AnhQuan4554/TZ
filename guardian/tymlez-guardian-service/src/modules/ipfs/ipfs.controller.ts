import { Body, Controller, Post, Param } from '@nestjs/common';
import { IpfsService } from './ipfs.service';

@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) {}
  @Post('/upload/:clientName')
  async upload(
    @Param('clientName') clientName: string,
    @Body() body: any,
  ): Promise<string> {
    return await this.ipfsService.upload(clientName, body);
  }
}
