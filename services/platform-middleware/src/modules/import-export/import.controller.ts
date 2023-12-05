import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  FirebaseAuthGuard,
  Permissions,
  PermissionGuard,
} from '@tymlez/backend-libs';
import { Express } from 'express';
import type { IImport, IMutationResult } from '@tymlez/platform-api-interfaces';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { ImportService } from './import.service';

@Controller('import')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class ImportController {
  constructor(private service: ImportService) {}

  @Post()
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  @UseInterceptors(FileInterceptor('file'))
  async import(
    @UploadedFile() file: Express.Multer.File,
    @Body('importData') strData: string,
  ): Promise<IMutationResult> {
    if (!file) {
      return { success: false, message: 'Please choose a file to import.' };
    }
    const importData: IImport[] = JSON.parse(strData);
    if (importData.length === 0) {
      return { success: false, message: 'Please choose data to import.' };
    }

    return await this.service.getImport(file.buffer, importData);
  }

  @Post('/preview')
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  @UseInterceptors(FileInterceptor('file'))
  async importFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IImport[]> {
    return await this.service.getFileImport(file.buffer);
  }
}
