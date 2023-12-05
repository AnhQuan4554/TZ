import { Injectable } from '@nestjs/common';
import { logger } from '@tymlez/backend-libs';
import axios, { AxiosResponse } from 'axios';
import {
  emailDestination,
  showCreateWorkflow,
  showDestinationList,
  showEmailChannel,
  showEmailDestination,
  showMobileChannel,
  showSlackChannel,
  showUpdateWorkflow,
  showWorkflow,
  showWorkflowList,
} from './data/workflow';
import type { IDestination, IWorkflow } from './interface/workflow';
import { Settings } from './settings';

@Injectable()
export class NewRelicAlertWorkflowService {
  public async provision(policyId: number) {
    const workflowList = await this.getWorkflowList();

    await this.createEmailWorkflow(policyId, workflowList);
    await this.createSlackAndMobileWorkflow(policyId, workflowList);
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

  private async getWorkflowList(): Promise<IWorkflow[]> {
    const data = { query: showWorkflowList };
    const res = await this.post(data);
    if (res === -1) {
      logger.error('Cannot get workflow list!');
      return [];
    }
    return res.data.actor.account.aiWorkflows.workflows.entities;
  }

  private async getDestinationList(): Promise<IDestination[]> {
    const data = { query: showDestinationList };
    const res = await this.post(data);
    if (res === -1) {
      logger.error('Cannot get destination list!');
      return [];
    }
    return res.data.actor.account.aiNotifications.destinations.entities;
  }

  private async createEmailWorkflow(
    policyId: number,
    workflowList: IWorkflow[],
  ) {
    const workflowName = `Policy: ${policyId} - ${Settings.policyName}`;
    logger.info(`Creating email worflow ${workflowName}`);

    const existingWorkflow = workflowList.find((x) => x.name === workflowName);
    if (existingWorkflow) {
      logger.info(`Email workflow ${workflowName} exists.`);
      return;
    }

    const destId = await this.createEmailDestination();
    const channelId = await this.createEmailChannel(destId);
    const data = { query: showWorkflow(policyId, channelId, workflowName) };
    const res = await this.post(data);
    if (res === -1) {
      logger.error('Cannot create email workflow!');
    } else {
      logger.info('Successfully created email workflow.');
    }
  }

  private async createEmailDestination(): Promise<string> {
    logger.info('Creating email destination ...');

    const destList = await this.getDestinationList();
    const existingDest = destList.find((x) => x.name === emailDestination.name);
    if (existingDest) {
      logger.info(`Email destination exists.`);
      return existingDest.id;
    }

    const data = { query: showEmailDestination() };
    const res = await this.post(data);
    if (res === -1) {
      logger.error(`Cannot create email destination!`);
      return '';
    }
    logger.info(`Successfully created email destination.`);
    return res.data.aiNotificationsCreateDestination.destination.id;
  }

  private async createEmailChannel(destinationId: string): Promise<string> {
    logger.info('Creating email channel ....');

    const data = { query: showEmailChannel(destinationId) };
    const res = await this.post(data);
    if (res === -1) {
      logger.error(`Cannot create email channel!`);
      return '';
    }
    logger.info('Successfully created email channel');
    return res.data.aiNotificationsCreateChannel.channel.id;
  }

  private async createSlackAndMobileWorkflow(
    policyId: number,
    workflowList: IWorkflow[],
  ) {
    const workflowName = Settings.slackChannel.includes('demo')
      ? `Policy: ${policyId} - ${Settings.policyName} - demo-Critical`
      : `Policy: ${policyId} - ${Settings.policyName} - Critical`;

    const existingWorkflow = workflowList.find((x) => x.name === workflowName);
    if (existingWorkflow) {
      logger.info(`Workflow ${workflowName} exists.`);

      const slackChannel = existingWorkflow.destinationConfigurations.find(
        (x) => x.type === 'SLACK',
      );
      if (slackChannel) {
        logger.info(`Slack workflow ${workflowName} exists.`);
      } else {
        logger.info(`Creating slack worflow ${workflowName} ...`);
        await this.createSlackWorkflow(existingWorkflow);
      }

      const mobileChannel = existingWorkflow.destinationConfigurations.find(
        (x) => x.type === 'MOBILE_PUSH',
      );
      if (mobileChannel) {
        logger.info(`Mobile workflow ${workflowName} exists.`);
      } else {
        logger.info(`Creating mobile workflow ${workflowName}....`);
        await this.createMobileWorkflow(existingWorkflow);
      }
    } else {
      logger.info(`Creating slack and mobile worflow ${workflowName}...`);
      const slackChannelId = await this.createSlackChannel();
      const mobileChannelId = await this.createMobileChannel();

      const data = {
        query: showCreateWorkflow(
          policyId,
          slackChannelId,
          mobileChannelId,
          workflowName,
        ),
      };
      const res = await this.post(data);
      if (res === -1) {
        logger.error('Cannot create slack and mobile workflow!');
      } else {
        logger.info('Successfully created slack and mobile workflow.');
      }
    }
  }

  private async updateWorkflow(
    oldChannelId: string,
    newChannelId: string,
    workflowId: string,
  ) {
    const data = {
      query: showUpdateWorkflow(oldChannelId, newChannelId, workflowId),
    };
    return await this.post(data);
  }

  private async createSlackWorkflow(workflow: IWorkflow) {
    const channelId = await this.createSlackChannel();
    const res = await this.updateWorkflow(
      workflow.destinationConfigurations[0].channelId,
      channelId,
      workflow.id,
    );
    if (res === -1) {
      logger.error('Cannot create slack workflow!');
    } else {
      logger.info('Successfully created slack workflow.');
    }
  }

  private async createSlackChannel(): Promise<string> {
    logger.info('Creating slack channel ....');

    const data = { query: showSlackChannel() };
    const res = await this.post(data);
    if (res === -1) {
      logger.error(`Cannot create slack channel!`);
      return '';
    }
    logger.info('Successfully created slack channel.');
    return res.data.aiNotificationsCreateChannel.channel.id;
  }

  private async createMobileWorkflow(workflow: IWorkflow) {
    const channelId = await this.createMobileChannel();
    const res = await this.updateWorkflow(
      workflow.destinationConfigurations[0].channelId,
      channelId,
      workflow.id,
    );
    if (res === -1) {
      logger.error('Cannot create mobile workflow!');
    } else {
      logger.info('Successfully created mobile workflow.');
    }
  }

  private async createMobileChannel(): Promise<string> {
    logger.info('Creating mobile channel ....');

    const data = { query: showMobileChannel() };
    const res = await this.post(data);
    if (res === -1) {
      logger.error(`Cannot create mobile channel!`);
      return '';
    }
    logger.info('Successfully created mobile channel.');
    return res.data.aiNotificationsCreateChannel.channel.id;
  }
}
