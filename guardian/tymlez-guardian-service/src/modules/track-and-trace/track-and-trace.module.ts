import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackAndTraceService } from './track-and-trace.service';
import { TrackAndTraceController } from './track-and-trace.controller';
import {
  ProcessedMrv,
  ProcessedMrvSchema,
} from '../../schemas/processed-mrv.schema';
import {
  DeviceConfig,
  DeviceConfigSchema,
} from '../../schemas/device-config.schema';

import { createGlobalVCDocumentHelper } from './documents/vc-document-loader';
import { TymlezUser, TymlezUserSchema } from '../../schemas/user.schema';

@Module({
  controllers: [TrackAndTraceController],
  providers: [
    TrackAndTraceService,
    {
      provide: 'VCDocumentLoaderName',
      useValue: createGlobalVCDocumentHelper(),
    },
  ],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: ProcessedMrv.name,
          schema: ProcessedMrvSchema,
        },
        {
          name: DeviceConfig.name,
          schema: DeviceConfigSchema,
        },

        {
          name: TymlezUser.name,
          schema: TymlezUserSchema,
        },
      ],
      'tymlez',
    ),
  ],
  exports: [],
})
export class TrackAndTraceModule {}
