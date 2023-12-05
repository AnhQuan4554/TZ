import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TaskProcessor } from './task-processor';
import { TaskProducer } from './task-producer';
import { TASK_QUEUE, MRV_QUEUE } from './runner.constants';
import { PlatformService } from '../platform/platform.service';
import { StorageService } from '../storage/storage.service';
import {
  ClientProvider,
  PlatformProvider,
} from '../platform/platform.provider';
import { WattwatchersService } from '../wattwatchers/wattwatchers.service';
import { MagnumService } from '../magnum/magnum.service';
import { UonService } from '../uon/uon.service';
import { SolcastService } from '../solcast/solcast.service';
import { MrvService } from '../mrv/mrv.service';
import { MrvTaskProcessor } from './mrv-processor';
import { CollectionService } from '../collection/collection.service';
import { TransformationService } from '../transformation/transformation.service';
import { IngestionService } from '../ingestion/ingestion.service';
import { ClientSpecificService } from '../client-specific/client-specific.service';
import { ClientService } from '../platform/client.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: TASK_QUEUE,
      defaultJobOptions: {
        removeOnComplete: 1000,
        removeOnFail: 10000,
      },
    }),
    BullModule.registerQueue({
      name: MRV_QUEUE,
      defaultJobOptions: {
        removeOnComplete: 1000,
        removeOnFail: 10000,
      },
    }),
  ],
  controllers: [],
  providers: [
    PlatformProvider,
    ClientProvider,
    PlatformService,
    StorageService,
    WattwatchersService,
    SolcastService,
    MagnumService,
    UonService,
    CollectionService,
    TransformationService,
    IngestionService,
    MrvService,
    MrvTaskProcessor,
    TaskProcessor,
    TaskProducer,
    ClientSpecificService,
    ClientService,
  ],
})
export class RunnerModule {}
