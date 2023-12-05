import { Module } from '@nestjs/common';
import { GuardianModule } from '../guardian/guardian.module';
import { MeterJobModule } from '../meter-job/meter-job.module';
import { NewRelicAlertWorkflowService } from './new-relic-alert-workflow.service';
import { NewRelicAlertService } from './new-relic-alert.service';
import { NewRelicDashboardService } from './new-relic-dashboard.service';
import { NewRelicSyntheticMonitorService } from './new-relic-synthetic-monitor.service';
import { NewRelicMicroservice } from './new-relic.microservice';
import { NewRelicService } from './new-relic.service';

@Module({
  imports: [GuardianModule, MeterJobModule],
  controllers: [NewRelicMicroservice],
  providers: [
    NewRelicAlertService,
    NewRelicDashboardService,
    NewRelicService,
    NewRelicAlertWorkflowService,
    NewRelicSyntheticMonitorService,
  ],
  exports: [NewRelicService],
})
export class NewRelicModule {}
