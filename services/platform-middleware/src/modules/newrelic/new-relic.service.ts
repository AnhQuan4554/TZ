import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { IGuardianSummary } from '@tymlez/platform-api-interfaces';
import { GuardianService } from '../guardian/guardian.service';
import { NewRelicAlertWorkflowService } from './new-relic-alert-workflow.service';
import { NewRelicAlertService } from './new-relic-alert.service';
import { NewRelicDashboardService } from './new-relic-dashboard.service';
import { NewRelicSyntheticMonitorService } from './new-relic-synthetic-monitor.service';
import { Settings } from './settings';

@Injectable()
export class NewRelicService {
  constructor(
    public readonly orm: MikroORM,
    private readonly guardianService: GuardianService,
    private readonly newrelicDashboardService: NewRelicDashboardService,
    private readonly newrelicAlertService: NewRelicAlertService,
    private readonly newrelicAlertWorkflowService: NewRelicAlertWorkflowService,
    private readonly newrelicSyntheticMonitorService: NewRelicSyntheticMonitorService,
  ) {}

  @UseRequestContext()
  public async provision() {
    if (Settings.clientPrefix.includes('local')) {
      return;
    }
    if (!Settings.apiKey) {
      return;
    }

    let guardianSummary: IGuardianSummary | null;
    try {
      guardianSummary = await this.guardianService.getSummary();
    } catch (err) {
      guardianSummary = null;
    }

    const policyId = await this.newrelicAlertService.provision(guardianSummary);
    await this.newrelicAlertWorkflowService.provision(policyId);
    await this.newrelicDashboardService.provision(guardianSummary);
  }

  public async createSyntheticMonitor(script: string, scriptName = '') {
    if (Settings.clientPrefix.includes('local')) {
      return;
    }

    await this.newrelicSyntheticMonitorService.provision(script, scriptName);
  }
}
