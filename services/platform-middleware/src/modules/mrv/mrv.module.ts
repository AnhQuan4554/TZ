import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { GuardianModule } from '../guardian/guardian.module';
import { MeterDataModule } from '../meter-data/meter-data.module';
import { MeterTaskModule } from '../meter-task/meter-task.module';
import { MeterJobModule } from '../meter-job/meter-job.module';
import { MeterModule } from '../meter/meter.module';
import { SettingModule } from '../settings/setting.module';
import { Mrv } from './entities/mrv.entity';
import { MrvController } from './mrv.controller';
import { MrvMicroservice } from './mrv.microservice';
import { MrvService } from './mrv.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Mrv]),
    MeterDataModule,
    MeterModule,
    SettingModule,
    AuthModule,
    MeterTaskModule,
    MeterJobModule,
    GuardianModule,
  ],
  controllers: [MrvMicroservice, MrvController],
  providers: [MrvService],
})
export class MrvModule {}
