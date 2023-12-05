import { Injectable } from '@nestjs/common';
import { logger } from '@tymlez/backend-libs';
import axios, { AxiosResponse } from 'axios';
import { IMonitor } from './interface/syntheticMonitor';
import { Settings } from './settings';

@Injectable()
export class NewRelicSyntheticMonitorService {
  public async provision(script: string, scriptName = '') {
    try {
      logger.info('Creating synthetic browser monitor ...');
      const monitorList = await this.getMonitorList();

      const browserMonitorName = Settings.browserMonitorName + scriptName;

      const existingBrowserMonitor = monitorList.find(
        (x) => x.name === browserMonitorName,
      );
      if (existingBrowserMonitor) {
        logger.info(`Browser monitor ${browserMonitorName} already exists.`);
        await this.updateScriptedBrowserMonitor(script, browserMonitorName);
      } else {
        await this.addScriptedBrowserMonitor(script, browserMonitorName);
      }
    } catch (err: any) {
      // swallow
    }
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

  private async getMonitorList(): Promise<IMonitor[]> {
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
        nrql: `accountId = ${Settings.accountId} AND (domain = 'SYNTH' AND type = 'MONITOR')`,
        sortType: ['REPORTING', 'ALERT_SEVERITY', 'NAME'],
      },
    };
    const res = await this.post(data);
    if (res === -1) {
      logger.error('Cannot get monitor list!');
      return [];
    }
    return res.data.actor.entitySearch.results.entities;
  }

  private async addScriptedBrowserMonitor(
    script: string,
    name = 'sample-browser-monitor',
  ): Promise<string> {
    logger.info(`Creating browser monitor ${name} ...`);

    const data = {
      query:
        'mutation ($accountId: Int!,$monitor: SyntheticsCreateScriptBrowserMonitorInput!) { syntheticsCreateScriptBrowserMonitor(monitor: $monitor, accountId: $accountId) { monitor { guid id __typename } errors { description type __typename } __typename } }',
      variables: {
        accountId: Settings.accountId,
        monitor: {
          advancedOptions: { enableScreenshotOnFailureAndScript: true },
          locations: { public: ['AP_SOUTHEAST_2'], private: [] },
          name,
          period: 'EVERY_30_MINUTES',
          runtime: {
            runtimeType: 'CHROME_BROWSER',
            runtimeTypeVersion: '100',
            scriptLanguage: 'JAVASCRIPT',
          },

          script,
          status: 'ENABLED',
        },
      },
    };

    const res = await this.post(data);

    if (res === -1) {
      logger.error(`Cannot create browser monitor ${name}!`);
      return '';
    }
    logger.info(`Successfully created browser monitor ${name}.`);

    return res.data.syntheticsCreateScriptBrowserMonitor.monitor.id;
  }

  private async updateScriptedBrowserMonitor(script: string, name: string) {
    logger.info(`Updating script for ${name} ...`, script);

    const data = {
      query:
        'mutation ($monitor: SyntheticsUpdateScriptBrowserMonitorInput!) { syntheticsUpdateScriptBrowserMonitor(monitor: $monitor, guid: "MzQ5NzYzMXxTWU5USHxNT05JVE9SfGQyMjQ1MDFhLTAyNWUtNDkwYS1hMzc2LTc1MGYxOTM2Njc4NQ") { monitor { guid id __typename } errors { description type __typename } __typename } }',

      variables: {
        monitor: {
          advancedOptions: { enableScreenshotOnFailureAndScript: true },
          locations: { public: ['AP_SOUTHEAST_2'], private: [] },
          name,
          period: 'EVERY_30_MINUTES',
          runtime: {
            runtimeType: 'CHROME_BROWSER',
            runtimeTypeVersion: '100',
            scriptLanguage: 'JAVASCRIPT',
          },
          script,
          status: 'ENABLED',
          tags: [],
        },
      },
    };

    const res = await this.post(data);

    if (
      res === -1 ||
      res.data.syntheticsUpdateScriptBrowserMonitor.errors.length > 0
    ) {
      logger.error(`Cannot update browser monitor script ${name}!`);
    } else {
      logger.info(`Successfully updated browser monitor script ${name}.`);
    }
  }

  // private async addScriptedApiMonitor(
  //   script: string,
  //   name = 'sample-api-monitor',
  // ): Promise<string> {
  //   logger.info('Creating api monitor ...');
  //   const data = {
  //     query:
  //       'mutation ($accountId: Int!,$monitor: SyntheticsCreateScriptApiMonitorInput!) { syntheticsCreateScriptApiMonitor(monitor: $monitor, accountId: $accountId) { monitor { guid id __typename } errors { description type __typename } __typename } }',
  //     variables: {
  //       accountId: Settings.accountId,
  //       monitor: {
  //         locations: { public: ['AP_SOUTHEAST_2'], private: [] },

  //         name,
  //         period: 'EVERY_30_MINUTES',
  //         runtime: {
  //           runtimeType: 'NODE_API',
  //           runtimeTypeVersion: '16.10',
  //           scriptLanguage: 'JAVASCRIPT',
  //         },

  //         script,
  //         status: 'ENABLED',
  //       },
  //     },
  //   };

  //   const res = await this.post(data);
  //   if (res === -1) {
  //     logger.error('Cannot create api monitor!');
  //     return '';
  //   }
  //   logger.info('Successfully created api monitor.');
  //   return res.data.syntheticsCreateScriptApiMonitor.monitor.id;
  // }

  //   private async validateMonitor(script: string): Promise<string> {
  //     const data = {
  //       query:
  //         'mutation ($locations: [String]!, $script: String!, $runtime: SyntheticsRuntimeInput) { syntheticsTriggerScriptValidation(accountId: 3497631, locations: $locations, monitorApiVersion: "LATEST", monitorType: SCRIPT_BROWSER, script: $script, runtime: $runtime) { location validationId __typename } }',
  //       variables: {
  //         locations: ['AWS_AP_SOUTHEAST_2'],

  //         runtime: {
  //           runtimeType: 'CHROME_BROWSER',
  //           runtimeTypeVersion: '100',
  //           scriptLanguage: 'JAVASCRIPT',
  //         },

  //         script,
  //       },
  //     };
  //     const res = await this.post(data);
  //     if (res === -1) {
  //       logger.error('Cannot validate monitor!');
  //       return '';
  //     }
  //     return res.data.syntheticsTriggerScriptValidation.validationId;
  //   }
}
