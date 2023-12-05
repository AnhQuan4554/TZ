import { Module } from '@nestjs/common';
import { ImportService } from './import.service';
import { ExportController } from './export.controller';
import { MeterJobModule } from '../meter-job/meter-job.module';
import { MeterModule } from '../meter/meter.module';
import { GuardianModule } from '../guardian/guardian.module';
import { ImportController } from './import.controller';
import { AuthModule } from '../auth/auth.module';
import { SiteModule } from '../dashboard-site/site.module';
import { FileModule } from '../file/file.module';
import { ExportService } from './export.service';
import { TenancyModule } from '../tenancy/tenancy.module';

@Module({
  imports: [
    GuardianModule,
    MeterModule,
    MeterJobModule,
    AuthModule,
    SiteModule,
    FileModule,
    TenancyModule,
  ],
  providers: [ImportService, ExportService],
  controllers: [ImportController, ExportController],
})
export class ImportExportModule {}
