import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import {
  FirebaseAuthGuard,
  Permissions,
  PermissionGuard,
} from '@tymlez/backend-libs';
import { Response } from 'express';
import { Readable } from 'stream';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { AuthService } from '../auth/auth.service';
import { ExportService } from './export.service';

@Controller('export')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class ExportController {
  constructor(
    private service: ExportService,
    private authService: AuthService,
  ) {}

  @Get()
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  async export(
    @Query('data') data: string,
    @Res() res: Response,
  ): Promise<void> {
    const dataList = data.split(',');
    const content = await this.service.getExport(dataList);
    const client = await this.authService.getClients();

    const stream = new Readable();

    stream.push(content);
    stream.push(null);
    res.set({
      'Content-Disposition': `attachment;filename=tymlez-platform-${client.name}-${process.env.ENV}.zip`,
      'Content-Type': 'application/zip',
      'Content-Length': content?.length,
    });
    stream.pipe(res);
  }
}
