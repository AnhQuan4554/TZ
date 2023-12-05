import { Controller, Get, Query, Res } from '@nestjs/common';
// import { FirebaseAuthGuard, Roles, PermissionGuard } from '@tymlez/backend-libs';
import type { Response } from 'express';
import { Readable } from 'stream';

import { FileService } from './file.service';

@Controller('file')
// @UseGuards(FirebaseAuthGuard, PermissionGuard)
export class FileController {
  constructor(private fileService: FileService) {}

  @Get('/')
  async getFile(
    @Query('url') url: string,
    @Res() res: Response,
  ): Promise<void> {
    const file = await this.fileService.getFile(url);
    const stream = new Readable();

    stream.push(file.content);
    stream.push(null);
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': file.contentLength,
    });
    stream.pipe(res);
  }

  @Get('/pdf')
  async getPDFFile(
    @Query('url') url: string,
    @Res() res: Response,
  ): Promise<void> {
    const file = await this.fileService.getFile(url);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': file.contentLength,
      'Content-Disposition': `inline; filename=${file.name}`, //if you change from inline to attachment if forces the file to download but inline displays the file on the browser
      Credentials: 'same-origin',
    });
    res.send(file.content);
  }
}
