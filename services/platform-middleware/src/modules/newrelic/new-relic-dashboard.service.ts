import { Injectable } from '@nestjs/common';
import { logger } from '@tymlez/backend-libs';
import axios, { AxiosResponse } from 'axios';
import { IGuardianSummary } from '@tymlez/platform-api-interfaces';
import { UseRequestContext, MikroORM } from '@mikro-orm/core';
import { showBillboardDashboard, showDashboard } from './data/dashboard';
import { INrql } from './interface/condition';
import { MeterJobService } from '../meter-job/meter-job.service';
import { IDashboard, IEntity, IWidget } from './interface/dashboard';
import {
  getAPIString,
  getErrorReportString,
  getQueryString,
  strBalance,
  strCronError,
  strCronSuccess,
  strJobError,
  strJobSuccess,
} from './data/queryString';
import { Settings } from './settings';
import { GuardianPolicyService } from '../guardian/policy/policy.service';

@Injectable()
export class NewRelicDashboardService {
  constructor(
    private readonly meterJobService: MeterJobService,
    private readonly policyService: GuardianPolicyService,
    public readonly orm: MikroORM,
  ) {}

  @UseRequestContext()
  public async provision(guardianSummary: IGuardianSummary | null) {
    logger.info('Creating dashboard ...');
    const data = await this.getDashboardList();
    let dashboardGUID = data.find((x) => x.name === Settings.policyName)?.guid;
    if (!dashboardGUID) {
      dashboardGUID = await this.createDashboard();
    }
    const dashboard = await this.getDashboard(dashboardGUID);
    if (!dashboard) {
      logger.error(`Dashboard ${dashboardGUID} not found.`);
      return;
    }
    const pagedDashboard = dashboard.pages;

    if (pagedDashboard) {
      const currentDashboard = pagedDashboard[0];
      if (currentDashboard.guid) {
        await this.addAccountBalance(
          guardianSummary,
          currentDashboard.guid,
          currentDashboard.widgets,
        );
        await this.addJobFinish(
          currentDashboard.guid,
          currentDashboard.widgets,
        );
        await this.addCron(currentDashboard.guid, currentDashboard.widgets);
        await this.addErrorReport(
          currentDashboard.guid,
          currentDashboard.widgets,
        );
        await this.addPlatformAPI(
          currentDashboard.guid,
          currentDashboard.widgets,
        );
        await this.addFrontendAPI(
          currentDashboard.guid,
          currentDashboard.widgets,
        );
      }
    }
    logger.info('Successfully created dashboard.');
  }

  private async createDashboard(): Promise<string> {
    const data: IDashboard = {
      query:
        'mutation CreateDashboard($accountId: Int!, $dashboard: DashboardInput!) { dashboardCreate(accountId: $accountId, dashboard: $dashboard) { entityResult { guid name description accountId createdAt updatedAt owner { email userId __typename } permissions pages { guid name description createdAt updatedAt owner { email userId __typename } widgets { id visualization { id __typename } layout { column row height width __typename } title linkedEntities { guid __typename } rawConfiguration __typename } __typename } __typename } errors { description type __typename } __typename } }',
      variables: {
        accountId: Settings.accountId,
        dashboard: {
          name: Settings.policyName,
          permissions: 'PUBLIC_READ_WRITE',
          pages: [
            {
              name: Settings.policyName,
              widgets: [],
            },
          ],
        },
      },
    };
    const res = await this.post(data);
    if (res === -1) {
      logger.error('Cannot create dashboard!');
      return '';
    }
    return res.data.dashboardCreate.entityResult.guid;
  }

  private async post(data: any): Promise<any> {
    try {
      const res: AxiosResponse = await axios.post(
        'https://api.newrelic.com/graphql',
        data,
        {
          headers: {
            'API-Key': Settings.apiKey,
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      );
      return res.data;
    } catch (err: any) {
      logger.error(err, err.message);
      return -1;
    }
  }

  private async getDashboardList(): Promise<IEntity[]> {
    const data = {
      query:
        'query PlatformEntitySearchQuery($cursor: String = null, $includeCount: Boolean = false, $includeResults: Boolean = true, $includeSummaryMetrics: Boolean = false, $includeTags: Boolean = false, $limit: Int = 500, $nrql: String, $sortType: [EntitySearchSortCriteria] = null) { actor { entitySearch(query: $nrql, sortBy: $sortType, options: {limit: $limit}) { results(cursor: $cursor) @include(if: $includeResults) { entities { ...EntityInfo ...EntityTags @include(if: $includeTags) ...SummaryMetrics @include(if: $includeSummaryMetrics) ...EntityFragmentExtension guid __typename } nextCursor ...SummaryMetricDefinitions @include(if: $includeSummaryMetrics) __typename } count types @include(if: $includeCount) { count domain type __typename } __typename } __typename } }  fragment EntityInfo on EntityOutline { guid accountId domain type name reporting account { id name __typename } ... on AlertableEntityOutline { alertSeverity __typename } __typename }  fragment EntityTags on EntityOutline { guid tags { key values __typename } __typename }  fragment SummaryMetricDefinitions on EntitySearchResult { entityTypes { domain type summaryMetricDefinitions { name title unit __typename } id __typename } __typename }  fragment SummaryMetrics on EntityOutline { guid summaryMetrics { value { ... on EntitySummaryNumericMetricValue { numericValue __typename } ... on EntitySummaryStringMetricValue { stringValue __typename } __typename } __typename } __typename }  fragment EntityFragmentExtension on EntityOutline { summaryMetrics { name title value { unit ... on EntitySummaryMetricValue { unit __typename } ... on EntitySummaryNumericMetricValue { numericValue unit __typename } ... on EntitySummaryStringMetricValue { stringValue unit __typename } __typename } __typename } ... on DashboardEntityOutline { owner { email userId __typename } permissions dashboardParentGuid guid __typename } guid __typename }',
      variables: {
        cursor: null,
        includeCount: true,
        includeResults: true,
        includeSummaryMetrics: false,
        includeTags: false,
        limit: 500,
        nrql: `(parentId IS NULL) AND accountId = ${Settings.accountId} AND (domain = 'VIZ' AND type = 'DASHBOARD')`,
        sortType: ['NAME'],
      },
    };

    const res = await this.post(data);
    if (res === -1) {
      logger.error('Cannot get dashboard list!');
      return [];
    }
    return res.data.actor.entitySearch.results.entities;
  }

  private async getDashboard(
    dashboardGuid: string,
  ): Promise<IEntity | undefined> {
    const data = {
      query:
        'query GetDashboardEntityQuery($entityGuid: EntityGuid!) { actor { entity(guid: $entityGuid) { ... on DashboardEntity { guid name description accountId createdAt updatedAt owner { email userId __typename } permissions pages { guid name description createdAt updatedAt owner { email userId __typename } widgets { id visualization { id __typename } layout { column row height width __typename } title linkedEntities { guid __typename } rawConfiguration __typename } __typename } __typename } guid __typename } __typename } }',
      variables: {
        entityGuid: `${dashboardGuid}`,
      },
    };
    const result = await this.post(data);
    return result === -1 ? undefined : result.data.actor.entity;
  }

  private async addWidgetToDashboard(dashboardGuid: string, widgets: IWidget) {
    const data = {
      query:
        'mutation AddWidgetsToPageMutation($entityGuid: EntityGuid!, $widgets: [WidgetInput!]!) { dashboardAddWidgetsToPage(guid: $entityGuid, widgets: $widgets) { errors { description type __typename } __typename } }',
      variables: {
        entityGuid: `${dashboardGuid}`,
        widgets,
      },
    };

    return await this.post(data);
  }

  private async addAccountBalance(
    guardianSummary: IGuardianSummary | null,
    dashboardGuid: string,
    widgets: IWidget[],
  ) {
    logger.info('Adding account balance to dashboard ...');
    if (!guardianSummary || guardianSummary.status === 'Not Ready') {
      logger.error(
        'Guardian not ready. Cannot show account balance on dashboard.',
      );
      return;
    }

    const { env } = guardianSummary;
    const title = `Account Balance`;
    const existingWidget = widgets.find((x) => x.title === title);
    if (!existingWidget) {
      const nrqlQueries: INrql[] = guardianSummary.entities.map((account) => {
        const name = account.username;
        const query = getQueryString(
          name,
          strBalance(name),
          env,
          true,
          'average',
        );

        return {
          accountId: Settings.accountId,
          query,
        };
      });
      const res = await this.addWidgetToDashboard(
        dashboardGuid,
        showDashboard(title, nrqlQueries),
      );
      if (res === -1) {
        logger.error('Cannot display account balance on dashboard!');
      }
    }
    logger.info('Successfully added account balance to dashboard.');
  }

  private async addJobFinish(dashboardGuid: string, widgets: IWidget[]) {
    logger.info('Adding job to dashboard ...');
    const jobs = (await this.meterJobService.findAll({ isPaused: false })).data;
    const env = `${Settings.clientPrefix}-tymlez-platform-worker`;

    jobs.map(async (job) => {
      const { name } = job;
      const title = `Job ${name}`;

      const existingWidget = widgets.find((x) => x.title === title);
      if (!existingWidget) {
        const querySuccess = getQueryString(
          `${name}_success`,
          strJobSuccess(name),
          env,
          true,
        );
        const queryError = getQueryString(
          `${name}_error`,
          strJobError(name),
          env,
          true,
        );
        const nrqlQueries: INrql[] = [
          {
            accountId: Settings.accountId,
            query: querySuccess,
          },
          {
            accountId: Settings.accountId,
            query: queryError,
          },
        ];
        const res = await this.addWidgetToDashboard(
          dashboardGuid,
          showDashboard(title, nrqlQueries),
        );
        if (res === -1) {
          logger.error(`Cannot display job ${name} on dashboard!`);
        }
      }
    });
    logger.info('Successfully added job to dashboard.');
  }

  private async addCron(dashboardGuid: string, widgets: IWidget[]) {
    logger.info('Adding cron to dashboard ...');
    const policies = (await this.policyService.getAll()).data;
    const env = `${Settings.clientPrefix}-tymlez-platform-api`;

    policies.map(async (policy) => {
      const { name } = policy;
      const title = `Cron ${name}`;

      const existingWidget = widgets.find((x) => x.title === title);
      if (!existingWidget) {
        const querySuccess = getQueryString(
          `${name}_success`,
          strCronSuccess(name),
          env,
          true,
        );
        const queryError = getQueryString(
          `${name}_error`,
          strCronError(name),
          env,
          true,
        );
        const nrqlQueries: INrql[] = [
          {
            accountId: Settings.accountId,
            query: querySuccess,
          },
          {
            accountId: Settings.accountId,
            query: queryError,
          },
        ];
        const res = await this.addWidgetToDashboard(
          dashboardGuid,
          showDashboard(title, nrqlQueries),
        );
        if (res === -1) {
          logger.error(`Cannot display cron ${name} on dashboard!`);
        }
      }
    });
    logger.info('Successfully added cron to dashboard.');
  }

  private async addErrorReport(dashboardGuid: string, widgets: IWidget[]) {
    logger.info('Adding error report to dashboard ...');

    const envPlatform = `${Settings.clientPrefix}-tymlez-platform-api`;
    const envClient = `${Settings.clientPrefix}-tymlez-client-api`;

    const title = `Web Transaction Error`;

    const existingWidget = widgets.find((x) => x.title === title);
    if (!existingWidget) {
      const queryPlatform = getErrorReportString(
        'Platfrom Api Error Transactions',
        envPlatform,
        true,
      );
      const queryClient = getErrorReportString(
        'Client Api Error Transactions',
        envClient,
        true,
      );

      const nrqlQueries: INrql[] = [
        {
          accountId: Settings.accountId,
          query: queryPlatform,
        },
        {
          accountId: Settings.accountId,
          query: queryClient,
        },
      ];
      const res = await this.addWidgetToDashboard(
        dashboardGuid,
        showDashboard(title, nrqlQueries),
      );
      if (res === -1) {
        logger.error(`Cannot display Web Transaction Error on dashboard!`);
      }
    }

    logger.info('Successfully added Web Transaction Error to dashboard.');
  }

  private async addPlatformAPI(dashboardGuid: string, widgets: IWidget[]) {
    logger.info('Adding Platform API Overview to dashboard ...');

    const env = `${Settings.clientPrefix}-tymlez-platform-api`;
    const title = `Platform API Overview`;

    const existingWidget = widgets.find((x) => x.title === title);
    if (!existingWidget) {
      const nrqlQueries: INrql[] = [
        {
          accountId: Settings.accountId,
          query: getAPIString(env),
        },
      ];
      const res = await this.addWidgetToDashboard(
        dashboardGuid,
        showBillboardDashboard(title, nrqlQueries),
      );
      if (res === -1) {
        logger.error(`Cannot display Platform API Overview on dashboard!`);
      }
    }

    logger.info('Successfully added Platform API Overview API to dashboard.');
  }

  private async addFrontendAPI(dashboardGuid: string, widgets: IWidget[]) {
    logger.info('Adding Client API Overview to dashboard ...');

    const env = `${Settings.clientPrefix}-tymlez-client-api`;
    const title = `Client API Overview`;

    const existingWidget = widgets.find((x) => x.title === title);
    if (!existingWidget) {
      const nrqlQueries: INrql[] = [
        {
          accountId: Settings.accountId,
          query: getAPIString(env),
        },
      ];
      const res = await this.addWidgetToDashboard(
        dashboardGuid,
        showBillboardDashboard(title, nrqlQueries),
      );
      if (res === -1) {
        logger.error(`Cannot display Client API Overview on dashboard!`);
      }
    }

    logger.info('Successfully added Client API Overview to dashboard.');
  }
}
