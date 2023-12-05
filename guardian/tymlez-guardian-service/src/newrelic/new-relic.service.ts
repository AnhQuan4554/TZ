import { Injectable } from '@nestjs/common';
import { NewRelicAlertWorkflowService } from './new-relic-alert-workflow.service';
import { NewRelicAlertService } from './new-relic-alert.service';
import { NewRelicDashboardService } from './new-relic-dashboard.service';
import { Settings } from './settings';

@Injectable()
export class NewRelicService {
  constructor(
    private readonly newrelicDashboardService: NewRelicDashboardService,
    private readonly newrelicAlertService: NewRelicAlertService,
    private readonly newrelicAlertWorkflowService: NewRelicAlertWorkflowService,
  ) {}

  public async provision() {
    if (Settings.clientPrefix.includes('local')) {
      return;
    }

    if (!Settings.apiKey) {
      return;
    }

    const policyId = await this.newrelicAlertService.provision();
    await this.newrelicAlertWorkflowService.provision(policyId);
    await this.newrelicDashboardService.provision();
  }
}
