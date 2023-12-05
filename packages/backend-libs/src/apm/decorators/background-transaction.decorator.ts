/* eslint-disable no-process-env */
/* eslint-disable no-param-reassign */
import newrelic from 'newrelic';

/**
 * Report background process to newrelic
 * @param transactionName: name of transaction
 * @param group: the transaction group
 * @example
 * ```js
 * @BackgroundTransaction("sampleNewRelicTransaction", "Sample")
 * async sampleNewRelicTransaction() {
 *   return new Promise((r) => {
 *     setTimeout(() => r({ d: new Date() }), Math.random() * 2000)
 *   });
 * }
 * ```
 * */
export function BackgroundTransaction(
  transactionName?: string,
  group?: string,
) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    const transactionGroup = target.transactionGroup || group || 'NA';
    descriptor.value = async (...args: any[]) => {
      if (process.env.NEW_RELIC_ENABLED === 'false') {
        return original.call(target, ...args);
      }
      const result = await newrelic.startBackgroundTransaction(
        transactionName || propertyKey,
        transactionGroup,
        async () => {
          const transaction = newrelic.getTransaction();
          try {
            const output = await original.call(target, ...args);
            return output;
          } catch (error) {
            newrelic.noticeError(error as Error);
            return error;
          } finally {
            transaction.end();
          }
        },
      );

      if (result instanceof Error) {
        throw result;
      }

      return result;
    };
  };
}

export async function withTransaction<T>(
  transactionName: string,
  transactionGroup: string,
  func: () => Promise<T>,
): Promise<T> {
  const result = await newrelic.startBackgroundTransaction(
    transactionName,
    transactionGroup,
    async () => {
      const transaction = newrelic.getTransaction();
      try {
        const output = await func();
        return output;
      } catch (error) {
        newrelic.noticeError(error as Error);
        return error;
      } finally {
        transaction.end();
      }
    },
  );

  if (result instanceof Error) {
    throw result;
  }

  return result as T;
}
