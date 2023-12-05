import { INrqlConditionDetail } from '../interface/condition';
import { Settings } from '../settings';

export const showCondition = (
  title: string,
  query: string,
  thresholdWarning = 1,
  thresholdCritical = 1,
  durationWarning = 15, //min
  durationCritical = 20, //min
  operator = 'below_or_equals',
): INrqlConditionDetail => {
  return {
    name: title,
    terms: [
      {
        duration: durationWarning,
        operator,
        threshold: thresholdWarning,
        time_function: 'all',
        priority: 'warning',
      },
      {
        duration: durationCritical,
        operator,
        threshold: thresholdCritical,
        time_function: 'all', //for at least
        priority: 'critical',
      },
    ],
    nrql: {
      query,
    },
  };
};

export const showUpdateSignal = (
  conditionId: number,
  expirationDuration: number,
  openViolationOnExpiration = false,
) => {
  return `mutation {
            alertsNrqlConditionStaticUpdate(
              accountId: ${Settings.accountId}
              id: ${conditionId}
              condition: {
                expiration: {
                  closeViolationsOnExpiration: false
                  expirationDuration: ${expirationDuration}
                  openViolationOnExpiration: ${openViolationOnExpiration}
                }
              }
            ) {
              id
              expiration {
                closeViolationsOnExpiration
                expirationDuration
                openViolationOnExpiration
              }
            }
          }`;
};

export const showRemoveSignal = (conditionId: number) => {
  return `mutation {
            alertsNrqlConditionStaticUpdate(
              accountId: ${Settings.accountId}
              id: ${conditionId}
              condition: {
                expiration: {}
              }
            ) {
              id              
            }
          }`;
};
