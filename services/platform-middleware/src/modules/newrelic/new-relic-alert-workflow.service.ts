import { Injectable } from '@nestjs/common';
import { logger } from '@tymlez/backend-libs';
import axios, { AxiosResponse } from 'axios';
import {
  emailDestination,
  showCreateSlackWorkflow,
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
    try {
      const workflowList = await this.getWorkflowList();

      await this.createEmailWorkflow(policyId, workflowList);
      await this.createSlackAndMobileWorkflow(policyId, workflowList);
    } catch (err: any) {
      logger.error({ err }, 'Unable to provision workflow alerts');
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
    const isDemo = Settings.slackChannel.includes('demo');
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
      if (!isDemo) {
        return;
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
      logger.info('Successfully created slack and mobile workflow.');
      return;
    }

    logger.info(`Creating slack and mobile worflow ${workflowName}...`);
    const slackChannelId = await this.createSlackChannel();
    const mobileChannelId = isDemo ? await this.createMobileChannel() : '';
    const data = isDemo
      ? {
          query: showCreateWorkflow(
            policyId,
            slackChannelId,
            mobileChannelId,
            workflowName,
          ),
        }
      : {
          query: showCreateSlackWorkflow(
            policyId,
            slackChannelId,
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

  //#region channel
  // private async getChannelList(): Promise<IChannel[]> {
  //   try {
  //     const data = {
  //       query: `{ actor { account(id: ${Settings.accountId}) {
  //         aiNotifications {
  //           channels {
  //             entities {
  //               id
  //               name
  //             }
  //           }
  //         }
  //       } } } `,
  //     };

  //     const res = await this.post(data);
  //     return res.data.actor.account.aiNotifications.channels.entities;
  //   } catch (err: any) {
  //     logger.error(err, err.message);
  //     return [];
  //   }
  // }

  // private async getChannel(id: string): Promise<IChannel | null> {
  //   const data = {
  //     query:
  //       'query GetChannel($accountId: Int!, $filters: AiNotificationsChannelFilter!) { actor { account(id: $accountId) { aiNotifications { channels(filters: $filters) { entities { ...ChannelFieldsFragment id __typename } __typename } __typename } id __typename } __typename } }  fragment ChannelFieldsFragment on AiNotificationsChannel { id name active destinationId status type createdAt updatedAt __typename }',
  //     variables: { accountId: Settings.accountId, filters: { id } },
  //   };

  //   const res = await this.post(data);
  //   if (res === -1) {
  //     logger.error(`Error Get Channel ${id}`, JSON.stringify(data));
  //     return null;
  //   }
  //   return res.data.actor.account.aiNotifications.channels.entities[0];
  // }

  //only delete channel when its workflow is deleted
  // private async deleteChannel(id: string) {
  //   try {
  //     const data = {
  //       query: ` mutation {
  //         aiNotificationsDeleteChannel(accountId: ${Settings.accountId}, channelId: "${id}") {
  //           ids
  //           error {
  //             details
  //           }
  //         }
  //       }`,
  //     };

  //     await this.post(data);
  //   } catch (err: any) {
  //     logger.error(err, err.message);
  //   }
  // }
  //#endregion

  // #region Destination
  // private async getDestination(id: string): Promise<string> {
  //   logger.info(`Getting destination ${id} Info ...`);
  //   const data = {
  //     query:
  //       'query GetDestination($accountId: Int!, $filters: AiNotificationsDestinationFilter!) { actor { account(id: $accountId) { aiNotifications { destinations(filters: $filters) { entities { ...DestinationFieldsFragment id __typename } __typename } __typename } id __typename } __typename } }  fragment DestinationFieldsFragment on AiNotificationsDestination { id name properties { displayValue key label value __typename } type createdAt updatedAt __typename }',
  //     variables: { accountId: Settings.accountId, filters: { id } },
  //   };

  //   const res = await this.post(data);
  //   if (res === -1) {
  //     logger.error(`Cannot get Destination ${id}`, JSON.stringify(data));
  //     return '';
  //   }
  //   logger.info(`Successfully getting destination ${id} Info!`);
  //   return res.data.actor.account.aiNotifications.destinations.entities[0].id;
  // }

  // private async createDestination(
  //   destination: IDestinationInput,
  // ): Promise<IDestination | null> {
  //   const data = {
  //     query:
  //       'mutation createDestination($accountId: Int!, $destination: AiNotificationsDestinationInput!) { aiNotificationsCreateDestination(accountId: $accountId, destination: $destination) { destination { ...allDestinationFieldsFragment id __typename } error { ...allResponseErrorFieldsFragment ...allValidationErrorFieldsFragment ...allSuggestionErrorFieldsFragment ...allConstraintErrorFieldsFragment __typename } __typename } }  fragment allDestinationFieldsFragment on AiNotificationsDestination { accountId active createdAt id lastSent name properties { value key __typename } type updatedAt updatedBy auth { ... on AiNotificationsBasicAuth { authType user __typename } ... on AiNotificationsOAuth2Auth { accessTokenUrl authType authorizationUrl clientId prefix refreshable refreshInterval scope __typename } ... on AiNotificationsTokenAuth { authType prefix __typename } __typename } status isUserAuthenticated __typename }  fragment allResponseErrorFieldsFragment on AiNotificationsResponseError { description type details __typename }  fragment allValidationErrorFieldsFragment on AiNotificationsDataValidationError { details fields { field message __typename } __typename }  fragment allSuggestionErrorFieldsFragment on AiNotificationsSuggestionError { description details type __typename }  fragment allConstraintErrorFieldsFragment on AiNotificationsConstraintsError { constraints { name dependencies __typename } __typename }',
  //     variables: {
  //       accountId: Settings.accountId,
  //       destination,
  //     },
  //   };
  //   //     const data = {
  //   //       query: `mutation {
  //   //   aiNotificationsCreateDestination(accountId: ${Settings.accountId}, destination: { type: EMAIL,
  //   //     name: ${getEmailD},
  //   //     properties: [
  //   //       {
  //   //         key: "email",
  //   //         value: "thao.pham@tymlez.com"
  //   //       }
  //   //     ]
  //   //    }) {
  //   //     destination {
  //   //       id
  //   //       name
  //   //     }
  //   //   }
  //   // }`,
  //   //     };

  //   const res = await this.post(data);

  //   return res === -1
  //     ? null
  //     : res.data.aiNotificationsCreateDestination.destination;
  // }
  // #endregion
}
