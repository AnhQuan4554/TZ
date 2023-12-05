import { Injectable } from '@nestjs/common';
import { logger } from '@tymlez/backend-libs';
import axios, { AxiosResponse } from 'axios';
import { showCondition } from './data/condition';
import type {
  ICondition,
  IConditionDetail,
  IPolicy,
} from './interface/condition';

import {
  getErrorReportString,
  getQueryString,
  strError,
} from './data/queryString';
import { Settings } from './settings';

@Injectable()
export class NewRelicAlertService {
  public async provision(): Promise<number> {
    try {
      logger.info('Creating guardian alert conditions ...');
      const { policies } = await this.getPolicies();
      const existingPolicy = policies.find(
        (policy) => policy.name === Settings.policyName,
      );
      const policyId = existingPolicy
        ? existingPolicy.id
        : await this.createPolicy();

      const conditions = (await this.getConditions(policyId)).nrql_conditions;
      await this.createGuardianCondition(policyId, conditions);
      await this.createErrorReportCondition(policyId, conditions);

      logger.info('Successfully created guardian alert conditions.');
      return policyId;
    } catch (err: any) {
      logger.info('Cannot create guardian alert conditions!');
      logger.error(err, err.message);
      return -1;
    }
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

  private async createPolicy(): Promise<number> {
    const res = await this.post('alerts_policies.json', {
      policy: {
        incident_preference: 'PER_CONDITION',
        name: Settings.policyName,
      },
    });
    if (res === -1) {
      logger.error('Cannot create guardian policy!');
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
    condition: IConditionDetail,
    signalLost = 60, //seconds
    enabled = true,
  ) {
    return await this.post(`alerts_nrql_conditions/policies/${policyId}.json`, {
      nrql_condition: {
        ...condition,
        type: 'static',
        enabled,
        value_function: 'single_value',
        violation_time_limit_seconds: 259200,
        runbook_url: '',
        signal: {
          aggregation_window: signalLost !== 0 ? signalLost : 60, //seconds
          aggregation_method: 'EVENT_FLOW',
          aggregation_delay: signalLost !== 0 ? 2 * signalLost : 2 * 60, //seconds
          fill_option: 'none',
        },
        expiration:
          signalLost !== 0
            ? {
                expiration_duration: signalLost, //seconds
                open_violation_on_expiration: true,
                close_violations_on_expiration: false,
              }
            : {},
      },
    });
  }

  private async getConditions(policyId: number): Promise<ICondition> {
    try {
      const { data } = await axios.get<ICondition>(
        'https://api.newrelic.com/v2/alerts_nrql_conditions.json',
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
      return { nrql_conditions: [] };
    }
  }

  private async createGuardianCondition(
    policyId: number,
    conditions: IConditionDetail[],
  ) {
    logger.info('Creating guardian condition ...');

    const title = 'Guardian Error';

    const existingCondition = conditions.find((con) => con.name === title);
    if (existingCondition) {
      logger.info(`Condition ${title} exists`);
    } else {
      const query = getQueryString(title, strError, Settings.env, false);
      const newCondition = showCondition(title, query);

      const res = await this.createCondition(policyId, newCondition, 0);
      if (res === -1) {
        logger.error('Cannot create condition for guardian error');
      }
    }

    logger.info('Successfully created guardian error condition.');
  }

  private async createErrorReportCondition(
    policyId: number,
    conditions: IConditionDetail[],
  ) {
    logger.info('Creating error report condition ...');

    const duration = 5; //minutes

    const title = `Error 500`;

    const existingCondition = conditions.find((con) => con.name === title);
    if (existingCondition) {
      logger.info(`Condition ${title} exists.`);
    } else {
      const query = getErrorReportString(title, Settings.env, false);
      const newCondition = showCondition(
        title,
        query,
        1,
        10,
        duration,
        2 * duration,
        'above_or_equals',
      );

      const res = await this.createCondition(policyId, newCondition, 0);
      if (res === -1) {
        logger.error(`Cannot create Error 500 condition!`);
      }
    }

    logger.info('Successfully created Error 500 condition.');
  }
}
