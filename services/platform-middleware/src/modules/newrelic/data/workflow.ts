import { Settings } from '../settings';

export const showWorkflow = (
  policyId: number,
  channelId: string,
  workflowName: string,
  priority = 'HIGH',
) => {
  return `mutation {
  aiWorkflowsCreateWorkflow(accountId: ${Settings.accountId},
      createWorkflowData: {
        destinationsEnabled: true, 
        workflowEnabled: true, 
        name: "${workflowName}", 
        issuesFilter: {        
          type: FILTER, 
          predicates: [{operator: EXACTLY_MATCHES, values: "${policyId}", attribute: "labels.policyIds"},
                      {operator: EQUAL, values: "${priority}", attribute: "priority"}]
        }, 
        destinationConfigurations: {channelId: "${channelId}"}, 
        enrichmentsEnabled: true, 
        enrichments: {nrql: []}, 
        mutingRulesHandling: DONT_NOTIFY_FULLY_MUTED_ISSUES
      })
    {
      workflow {
        id
        name
        destinationConfigurations {
          channelId
          name
          type
        }      
      }
    errors {
      description
      type
    }
  }
}`;
};

export const showCreateWorkflow = (
  policyId: number,
  slackChannelId: string,
  mobileChannelId: string,
  workflowName: string,
) => {
  return `mutation {
    aiWorkflowsCreateWorkflow(accountId: ${Settings.accountId},
        createWorkflowData: {
          destinationsEnabled: true, 
          workflowEnabled: true, 
          name: "${workflowName}", 
          issuesFilter: {        
            type: FILTER, 
            predicates: [{operator: EXACTLY_MATCHES, values: "${policyId}", attribute: "labels.policyIds"},
                        {operator: EQUAL, values: "CRITICAL", attribute: "priority"}]
          }, 
          destinationConfigurations: [{channelId: "${slackChannelId}"},
                                      {channelId: "${mobileChannelId}"}]         
          mutingRulesHandling: DONT_NOTIFY_FULLY_MUTED_ISSUES
        })
      {
        workflow {
          id
          name
          destinationConfigurations {
            channelId
            name
            type
          }      
        }
      errors {
        description
        type
      }
    }
  }`;
};

export const showCreateSlackWorkflow = (
  policyId: number,
  slackChannelId: string,
  workflowName: string,
) => {
  return `mutation {
    aiWorkflowsCreateWorkflow(accountId: ${Settings.accountId},
        createWorkflowData: {
          destinationsEnabled: true, 
          workflowEnabled: true, 
          name: "${workflowName}", 
          issuesFilter: {        
            type: FILTER, 
            predicates: [{operator: EXACTLY_MATCHES, values: "${policyId}", attribute: "labels.policyIds"},
                        {operator: EQUAL, values: "CRITICAL", attribute: "priority"}]
          }, 
          destinationConfigurations: [{channelId: "${slackChannelId}"}]         
          mutingRulesHandling: DONT_NOTIFY_FULLY_MUTED_ISSUES
        })
      {
        workflow {
          id
          name
          destinationConfigurations {
            channelId
            name
            type
          }      
        }
      errors {
        description
        type
      }
    }
  }`;
};

export const showWorkflowList = `{
      actor {
        account(id: ${Settings.accountId}) {
          aiWorkflows {
            workflows(filters: {}) {
              entities {
                id
                name
                workflowEnabled
                destinationConfigurations {
                  channelId
                  name
                  type
                }
                enrichments {
                  configurations {
                    ... on AiWorkflowsNrqlConfiguration {
                      query
                    }
                  }
                  id
                  name
                }
                issuesFilter {
                  predicates {
                    attribute
                    operator
                    values
                  }
                }
              }
              nextCursor
              totalCount
            }
          }
        }
      }
    }`;

export const showEmailChannel = (destinationId: string) => {
  const channelName = `${Settings.policyName} ${emailDestination.name} channel`;

  return `mutation { aiNotificationsCreateChannel(accountId: ${Settings.accountId}, channel: {
                type: EMAIL,
                name: "${channelName}",
                destinationId: "${destinationId}",
                product: IINT,
                properties: [
                  { key: "subject", value: "{{ issueTitle }}" },
                  { key: "customDetailsEmail", value: "{{accumulations.conditionName}}" },
                ],
              }) {
                channel {
                  id
                  name
                }
              }
            }`;
};

export const showDestinationList = `{ 
      actor { 
        account(id: ${Settings.accountId}) {
            aiNotifications {
              destinations {
                entities {
                  id
                  name
                }
                error {
                  details
                }
              }
            }
          }  
        } 
      }`;

export const showEmailDestination = () => {
  return `mutation {
                aiNotificationsCreateDestination(accountId: ${Settings.accountId}, destination: {
                  type: EMAIL,
                  name: "${emailDestination.name}",
                  properties: [
                    {
                      key: "email",
                      value: "${emailDestination.email}",
                    }
                  ]
                }) {
                  destination {
                    id
                    name
                  }
                }
              }`;
};

export const emailDestination = {
  name: 'DEV-Email',
  email: 'development+newrelic@tymlez.com',
};

export const showSlackChannel = () => {
  const value = Settings.slackChannel.includes('demo')
    ? 'C04C1EU8G12'
    : 'C03E831CG93';
  const channelName = `${Settings.policyName} ${Settings.slackChannel} channel`;

  return `mutation {
    aiNotificationsCreateChannel(accountId: ${Settings.accountId}, channel: {
      type: SLACK,
      name: "${channelName}",
      destinationId: "97d94715-b03f-4c68-9ea1-50cbdff23619",
      product: IINT,
      properties: [
        {
          displayValue: "${Settings.slackChannel}",
          key: "channelId",
          value: "${value}"
        },
        {
          key: "customDetailsSlack", 
          value: "{{issueTitle}}"
        }
      ]
    }) 
    {
      channel {
        id
        name
      }
    }
  }`;
};

export const showMobileChannel = () => {
  const channelName = `${Settings.policyName} mobile channel`;

  return `mutation {
    aiNotificationsCreateChannel(accountId: ${Settings.accountId}, channel: {
      product: IINT,
      destinationId: "eba13077-8e87-4b5a-a38a-e86ed112f0b0",
      type: MOBILE_PUSH,
      name: "${channelName}",
      properties: []
    })
      { 
        channel {
          id
          name
        }
      }
  }`;
};

export const showUpdateWorkflow = (
  oldChannelId: string,
  newChannelId: string,
  workflowId: string,
) => {
  return `mutation {
    aiWorkflowsUpdateWorkflow(accountId: ${Settings.accountId}, 
      updateWorkflowData: {
        destinationConfigurations: [{channelId: "${oldChannelId}"},
                                      {channelId: "${newChannelId}"}]  

        id: "${workflowId}"
      })
      {
        workflow {
          id
          name
          destinationConfigurations {
              channelId
              name
              type
            }      
        }
        errors {
          description
          type
        }
      }
  }`;
};
