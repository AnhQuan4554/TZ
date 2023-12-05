import {
  SSMClient,
  GetParametersCommand,
  Parameter,
} from '@aws-sdk/client-ssm';

const ssm = new SSMClient({ region: 'ap-southeast-2' });

export async function getParameters(
  names: string[],
): Promise<(string | undefined)[]> {
  const parameters = (
    await ssm.send(
      new GetParametersCommand({
        Names: names,
        WithDecryption: true,
      }),
    )
  ).Parameters;

  const parametersMap = parameters?.reduce((acc, parameter) => {
    if (parameter.Name) {
      acc[parameter.Name] = parameter;
    }

    return acc;
  }, {} as Record<string, Parameter | undefined>);

  return names.map((name) => parametersMap?.[name]?.Value);
}
