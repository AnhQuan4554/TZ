import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { Meter } from '../meter/entities/meter.entity';
import { MeterModule } from '../meter/meter.module';
import { Site } from './entities/site.entity';
import { SiteController } from './site.controller';
import { SiteMicroservice } from './site.microservice';
import { SiteService } from './site.service';

@Module({
  imports: [MikroOrmModule.forFeature([Site, Meter]), AuthModule, MeterModule],
  controllers: [SiteController, SiteMicroservice],
  providers: [SiteService],
  exports: [SiteService],
})
export class SiteModule {}
