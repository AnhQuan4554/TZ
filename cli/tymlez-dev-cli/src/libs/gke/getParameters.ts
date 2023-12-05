import { SSMClient, GetParameterCommand, Parameter } from '@aws-sdk/client-ssm';

const ssm = new SSMClient({ region: 'ap-southeast-2' });

export async function getParameters(
  names: string[],
): Promise<(string | undefined)[]> {
  const tasks = names.map((name) =>
    ssm.send(
      new GetParameterCommand({
        Name: name,
        WithDecryption: true,
      }),
    ),
  );

  const parameters = await Promise.all(tasks);

  const parametersMap = parameters
    .map((x) => x.Parameter)
    ?.reduce((acc, parameter) => {
      if (parameter?.Name) {
        acc[parameter?.Name] = parameter;
      }

      return acc;
    }, {} as Record<string, Parameter | undefined>);

  return names.map((name) => parametersMap?.[name]?.Value || '');
}
