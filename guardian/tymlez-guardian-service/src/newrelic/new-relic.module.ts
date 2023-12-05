import { Module } from '@nestjs/common';
import { NewRelicAlertWorkflowService } from './new-relic-alert-workflow.service';
import { NewRelicAlertService } from './new-relic-alert.service';
import { NewRelicDashboardService } from './new-relic-dashboard.service';
import { NewRelicService } from './new-relic.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    NewRelicAlertService,
    NewRelicDashboardService,
    NewRelicService,
    NewRelicAlertWorkflowService,
  ],
  exports: [NewRelicService],
})
export class NewRelicModule {}
