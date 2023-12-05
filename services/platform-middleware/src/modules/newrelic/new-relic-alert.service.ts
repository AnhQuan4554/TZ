import { Injectable } from '@nestjs/common';
import { logger } from '@tymlez/backend-libs';
import axios, { AxiosResponse } from 'axios';
import { IGuardianSummary } from '@tymlez/platform-api-interfaces';
import _ from 'lodash';
import {
  showCondition,
  showRemoveSignal,
  showUpdateSignal,
} from './data/condition';
import {
  INrqlConditionDetail,
  IPolicy,
  ISyntheticConditionDetail,
} from './interface/condition';
import { MeterJobService } from '../meter-job/meter-job.service';
import {
  getErrorReportString,
  getQueryString,
  strBalance,
  strCronError,
  strJobError,
  strJobSuccess,
} from './data/queryString';
import { Settings } from './settings';
import { IMonitorList } from './interface/syntheticMonitor';
import { GuardianPolicyService } from '../guardian/policy/policy.service';

@Injectable()
export class NewRelicAlertService {
  constructor(
    private readonly meterJobService: MeterJobService,
    private readonly policyService: GuardianPolicyService,
  ) {}

  public async provision(
    guardianSummary: IGuardianSummary | null,
  ): Promise<number> {
    try {
      logger.info('Creating alert conditions ...');
      const { policies } = await this.getPolicies();
      const existingPolicy = policies.find(
        (policy) => policy.name === Settings.policyName,
      );
      const policyId = existingPolicy
        ? existingPolicy.id
        : await this.createPolicy();

      await this.createNRQLConditions(policyId, guardianSummary);
      await this.createSyntheticConditions(policyId);

      logger.info('Successfully created alert conditions.');
      return policyId;
    } catch (err: any) {
      logger.info('Cannot create alert conditions!');
      logger.error(err, err.message);
      return -1;
    }
  }

  private async createNRQLConditions(
    policyId: number,
    guardianSummary: IGuardianSummary | null,
  ) {
    const res = await this.get('alerts_nrql_conditions', policyId);
    const conditions: INrqlConditionDetail[] =
      res === null ? [] : res.nrql_conditions;
    await this.createAccountBalanceCondition(
      guardianSummary,
      policyId,
      conditions,
    );
    await this.createJobFinishCondition(policyId, conditions);
    await this.createCronCondition(policyId, conditions);
    await this.createErrorReportCondition(policyId, conditions);
  }

  private async post(endpoint: string, data: any): Promise<any> {
    try {
      const res: AxiosResponse = await axios.post(
        `https://api.newrelic.com/v2/${endpoint}`,
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

  private async get(endpoint: string, policyId: number): Promise<any> {
    try {
      const { data } = await axios.get<any>(
        `https://api.newrelic.com/v2/${endpoint}.json`,
        {
          headers: {
            'Api-Key': `${Settings.apiKey}`,
          },
          params: { policy_id: policyId },
        },
      );
      return data;
    } catch (err: any) {
      logger.error(err, err.message);
      return null;
    }
  }

  private async createPolicy(): Promise<number> {
    const res = await this.post('alerts_policies.json', {
      policy: {
        incident_preference: 'PER_CONDITION',
        name: Settings.policyName,
      },
    });
    if (res === -1) {
      logger.error('Cannot create policy!');
      return -1;
    }
    return res.policy.id;
  }

  private async getPolicies(): Promise<IPolicy> {
    try {
      const { data } = await axios.get<IPolicy>(
        'https://api.newrelic.com/v2/alerts_policies.json',
        {
          headers: {
            'Api-Key': `${Settings.apiKey}`,
          },
        },
      );
      return data;
    } catch (err: any) {
      logger.error(err, err.message);
      return { policies: [] };
    }
  }

  private async createCondition(
    policyId: number,
    condition: INrqlConditionDetail,
    signalLost = 300, //seconds
    enabled = true,
    openViolation = true,
  ) {
    const data = {
      nrql_condition: {
        ...condition,
        type: 'static',
        enabled,
        value_function: 'single_value',
        violation_time_limit_seconds: 259200,
        runbook_url: '',
        signal: {
          aggregation_window: signalLost !== 0 ? signalLost : 300, //seconds
          aggregation_method: 'EVENT_FLOW',
          aggregation_delay: signalLost !== 0 ? signalLost : 300, //seconds
          fill_option: 'none',
        },

        expiration:
          signalLost !== 0
            ? {
                expiration_duration: 3 * signalLost, //seconds
                open_violation_on_expiration: openViolation,
                close_violations_on_expiration: false,
              }
            : {},
      },
    };
    return await this.post(
      `alerts_nrql_conditions/policies/${policyId}.json`,
      data,
    );
  }

  private async createAccountBalanceCondition(
    guardianSummary: IGuardianSummary | null,
    policyId: number,
    conditions: INrqlConditionDetail[],
  ) {
    logger.info('Creating account balance condition ...');
    if (!guardianSummary || guardianSummary.status === 'Not Ready') {
      logger.error(
        'Guardian not ready. Cannot create account balance condition!',
      );
      return;
    }
    const signalLostInSecond = 900;
    guardianSummary.entities.map(async (x) => {
      const name = x.username;
      const title = `Low Account Balance: ${name}`;

      const existingCondition = conditions.find((con) => con.name === title);
      if (existingCondition) {
        logger.info(`Condition ${title} exists`);
        if (
          existingCondition.expiration?.expiration_duration !==
          signalLostInSecond
        ) {
          await this.updateConditionSignalLost(
            existingCondition,
            signalLostInSecond,
          );
        }
      } else {
        const query = getQueryString(
          name,
          strBalance(name),
          guardianSummary.env,
          false,
          'average',
        );
        const newCondition = showCondition(title, query, 50000, 20000);

        const res = await this.createCondition(policyId, newCondition);
        if (res === -1) {
          logger.error(`Cannot create condition for account ${name}!`);
        }
      }
    });

    logger.info('Successfully created account balance condition.');
  }

  private async createJobFinishCondition(
    policyId: number,
    conditions: INrqlConditionDetail[],
  ) {
    logger.info('Creating job condition ...');
    const jobs = (
      await this.meterJobService.findAll({}, { populate: ['meter'] })
    ).data;
    const env = `${Settings.clientPrefix}-tymlez-platform-worker`;

    jobs.map(async (job) => {
      const { name } = job;
      const { interval } = job.meter; //seconds
      const duration = _.ceil(interval / 60); //minutes
      const isActive = !job.isPaused;

      //Job Success: alert if less than 1 success
      const titleSuccess = `No Job Finish: ${name}`;
      const querySuccess = getQueryString(
        name,
        strJobSuccess(name),
        env,
        false,
      );
      const signalLostInMinute = 3 * duration;
      const signalLostInSecond = 60 * signalLostInMinute;
      const conditionSuccess = conditions.find(
        (con) => con.name === titleSuccess,
      );
      if (conditionSuccess) {
        logger.info(`Condition ${titleSuccess} exists.`);

        if (
          conditionSuccess.expiration?.expiration_duration !==
          signalLostInSecond
        ) {
          await this.updateConditionSignalLost(
            conditionSuccess,
            signalLostInSecond,
          );
        }
      } else {
        const newCondition = showCondition(
          titleSuccess,
          querySuccess,
          1,
          1,
          signalLostInMinute,
          4 * duration,
        );

        const res = await this.createCondition(
          policyId,
          newCondition,
          interval,
          isActive,
        );
        if (res === -1) {
          logger.error(`Cannot create condition for Job Success ${name}!`);
        }
      }

      //Job Error: alert if having more than 2 error
      const titleError = `Job Error: ${name}`;
      const queryError = getQueryString(name, strJobError(name), env, false);

      const conditionError = conditions.find((con) => con.name === titleError);
      if (conditionError) {
        logger.info(`Condition ${titleError} exists.`);

        if (conditionError.expiration?.open_violation_on_expiration) {
          await this.removeSignalLost(conditionError);
        }
      } else {
        const newCondition = showCondition(
          titleError,
          queryError,
          1,
          2,
          3 * duration,
          4 * duration,
          'above_or_equals',
        );

        const res = await this.createCondition(
          policyId,
          newCondition,
          0,
          isActive,
          false,
        );
        if (res === -1) {
          logger.error(`Cannot create condition for Job Error ${name}!`);
        }
      }
    });
    logger.info('Successfully created job condition.');
  }

  private async loadSyntheticMonitorList(): Promise<IMonitorList> {
    try {
      const { data } = await axios.get<IMonitorList>(
        `https://frame-alerts.newrelic.com/internal_api/1/accounts/${Settings.accountId}/conditions/load_synthetics_monitors?options=%7B%22source%22:%22Monitors%22,%22pagination%22:%7B%22size%22:250%7D%7D`,
        {
          headers: {
            'Api-Key': `${Settings.apiKey}`,
            'x-requested-with': 'XMLHttpRequest',
          },
        },
      );
      return data;
    } catch (err: any) {
      logger.error(err, err.message);
    }

    return { entities: [], total: 0 };
  }

  private async updateConditionSignalLost(
    condition: INrqlConditionDetail,
    signalLost: number,
  ) {
    const conditionName = condition.name;
    logger.info(`Updating signal lost on condition ${conditionName} ...`);

    const data = {
      query: showUpdateSignal(condition.id || 0, signalLost, true),
    };

    const res = await this.signalPost(data);
    if (res === -1) {
      logger.error(`Cannot update signal lost for condition ${conditionName}!`);
    } else {
      logger.info(
        `Successfully updated signal lost for condition ${conditionName}.`,
      );
    }
  }

  private async removeSignalLost(condition: INrqlConditionDetail) {
    const conditionName = condition.name;
    logger.info(`Updating no signal on condition ${conditionName} ...`);

    const data = {
      query: showRemoveSignal(condition.id || 0),
    };

    const res = await this.signalPost(data);
    if (res === -1) {
      logger.error(`Cannot remove signal lost for condition ${conditionName}!`);
    } else {
      logger.info(
        `Successfully remove signal lost for condition ${conditionName}.`,
      );
    }
  }

  private async signalPost(data: any): Promise<number> {
    try {
      await axios.post('https://api.newrelic.com/graphql', data, {
        headers: {
          'API-Key': Settings.apiKey,
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      return 1;
    } catch (err: any) {
      logger.error(err, err.message);
      return -1;
    }
  }

  private async createSyntheticConditions(policyId: number) {
    const monitorList = await this.loadSyntheticMonitorList();
    const monitors = monitorList.entities.filter((m) =>
      m.name.includes(Settings.browserMonitorName),
    );
    if (!monitors || monitors.length === 0) {
      logger.error(
        `Cannot create condition for browser monitor ${Settings.browserMonitorName} cause it does not exist!`,
      );
      return;
    }

    const res = await this.get('alerts_synthetics_conditions', policyId);
    const conditions: ISyntheticConditionDetail[] =
      res === null ? [] : res.synthetics_conditions;

    for await (const monitor of monitors) {
      const conditionName = `Synthetic monitor: ${monitor.name}`;

      const existingCondition = conditions.find(
        (con) => con.name === conditionName,
      );
      if (existingCondition) {
        logger.info(`Condition ${conditionName} exists`);
        return;
      }

      await this.createMonitorCondition(policyId, conditionName, monitor.id);
    }
  }

  private async createMonitorCondition(
    policyId: number,
    conditionName: string,
    monitorId: string,
  ) {
    const res = await this.post(
      `alerts_synthetics_conditions/policies/${policyId}.json`,
      {
        synthetics_condition: {
          name: conditionName,
          monitor_id: monitorId,
          runbook_url: '',
          enabled: true,
        },
      },
    );
    if (res === -1) {
      logger.error(`Cannot create monitor condition ${conditionName}!`);
    } else {
      logger.info(`Successfully created monitor condition ${conditionName}!`);
    }
  }

  private async createCronCondition(
    policyId: number,
    conditions: INrqlConditionDetail[],
  ) {
    logger.info('Creating cron condition ...');
    const policies = (await this.policyService.getAll()).data;
    const env = `${Settings.clientPrefix}-tymlez-platform-api`;

    policies.map(async (policy) => {
      const { name } = policy;
      const duration = 10; //minutes

      //Cron Error: alert if having more than 1 error
      const titleError = `Cron Error: ${name}`;
      const queryError = getQueryString(name, strCronError(name), env, false);

      const conditionError = conditions.find((con) => con.name === titleError);
      if (conditionError) {
        logger.info(`Condition ${titleError} exists.`);

        if (conditionError.expiration?.open_violation_on_expiration) {
          await this.removeSignalLost(conditionError);
        }
      } else {
        const newCondition = showCondition(
          titleError,
          queryError,
          1,
          1,
          duration,
          2 * duration,
          'above_or_equals',
        );

        const res = await this.createCondition(policyId, newCondition, 0);
        if (res === -1) {
          logger.error(`Cannot create condition for Cron Error ${name}!`);
        }
      }
    });
    logger.info('Successfully created cron condition.');
  }

  private async createErrorReportCondition(
    policyId: number,
    conditions: INrqlConditionDetail[],
  ) {
    logger.info('Creating error report condition ...');

    const env = [
      {
        name: 'Platform Api',
        value: `${Settings.clientPrefix}-tymlez-platform-api`,
      },
      {
        name: 'Client Api',
        value: `${Settings.clientPrefix}-tymlez-client-api`,
      },
    ];

    const duration = 5; //minutes

    env.map(async (x) => {
      const titleError = `Web Error - ${x.name}`;
      const queryError = getErrorReportString(x.name, x.value);

      const existingCondition = conditions.find(
        (con) => con.name === titleError,
      );
      if (existingCondition) {
        logger.info(`Condition ${titleError} exists.`);
      } else {
        const newCondition = showCondition(
          titleError,
          queryError,
          1,
          10,
          duration,
          2 * duration,
          'above_or_equals',
        );

        const res = await this.createCondition(policyId, newCondition, 0);
        if (res === -1) {
          logger.error(
            `Cannot create Web Transaction Error condition ${x.name}!`,
          );
        }
      }
    });
    logger.info('Successfully created Web Transaction Error condition.');
  }
}
