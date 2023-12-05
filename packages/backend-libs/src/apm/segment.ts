import nr from 'newrelic';

export async function withSegment<T>(
  name: string,
  handler: () => Promise<T>,
): Promise<T> {
  const result = await nr.startSegment(name, true, async () => {
    try {
      return await handler();
    } catch (err) {
      return err;
    }
  });
  if (result instanceof Error) {
    throw result;
  }
  return result as T;
}
