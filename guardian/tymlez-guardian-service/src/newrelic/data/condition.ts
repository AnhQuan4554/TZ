import type { IConditionDetail } from '../interface/condition';

export const showCondition = (
  title: string,
  query: string,
  thresholdWarning = 1,
  thresholdCritical = 10,
  durationWarning = 1, //min
  durationCritical = 5, //min
  operator = 'above_or_equals',
): IConditionDetail => {
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
