import { validateMaybeResults } from '@tymlez/common-libs';
import assert from 'assert';
import { format } from 'date-fns';
import {
  findTerraformVariables,
  findTerraformWorkspace,
  runTerraform,
  updateTerraformVariable,
  updateTerraformVariables,
} from '../../../libs';

export async function getTFWorkspaceID(workspaceName: string) {
  const terraformApiHeaders = {
    Authorization: `Bearer ${process.env.TF_TOKEN}`,
    'Content-Type': 'application/vnd.api+json',
  } as any;

  const workspace = await findTerraformWorkspace({
    workspaceName,
    headers: terraformApiHeaders,
  });
  assert(workspace, `Cannot find workspace: ${workspaceName}`);
  return workspace.id;
}

export async function deployViaTerraform({
  gitSha,
  gitTag,
  tfToken,
  workspaceName,
  backendType,
  apply = true,
}: {
  gitSha: string;
  gitTag: string;
  tfToken: string;
  workspaceName: string;
  apply: boolean;
  backendType: 'tymlez' | 'worker' | 'client';
}) {
  const terraformApiHeaders = {
    Authorization: `Bearer ${tfToken}`,
    'Content-Type': 'application/vnd.api+json',
  };

  const workspace = await findTerraformWorkspace({
    workspaceName,
    headers: terraformApiHeaders,
  });
  assert(workspace, `Cannot find workspace: ${workspaceName}`);

  const variablePrefix = backendType === 'tymlez' ? 'platform' : backendType;
  const variableName = `${variablePrefix}_release`;
  const variables = [
    {
      key: variableName,
      value: JSON.stringify({
        release_date: format(new Date(), 'yyyy-MM-dd'),
        git_sha: gitSha,
        git_tag: gitTag,
      }),
    },
  ];

  const updateResults = await updateTerraformVariables({
    workspaceId: workspace.id,
    entries: variables,
    headers: terraformApiHeaders,
  });

  validateMaybeResults({
    message: 'Failed to update terraform variables',
    inputs: variables.map((entry) => entry.key),
    results: updateResults,
  });
  console.log('APPLY apply: ', apply);
  if (apply) {
    const runResult = await runTerraform({
      workspaceId: workspace.id,
      headers: terraformApiHeaders,
      message: `Deploy from platform-middleware: ${gitSha} at ${new Date().toISOString()}`,
    });

    console.log('Successfully run Terraform', {
      gitSha,
      resultId: runResult.id,
    });
  } else {
    console.log('TF apply was skipped to respect `apply` value');
  }
}

export async function applyTerraform({
  gitSha,
  tfToken,
  workspaceName,
}: {
  gitSha: string;
  tfToken: string;
  workspaceName: string;
}) {
  const terraformApiHeaders = {
    Authorization: `Bearer ${tfToken}`,
    'Content-Type': 'application/vnd.api+json',
  };

  const workspace = await findTerraformWorkspace({
    workspaceName,
    headers: terraformApiHeaders,
  });
  assert(workspace, `Cannot find workspace: ${workspaceName}`);

  const runResult = await runTerraform({
    workspaceId: workspace.id,
    headers: terraformApiHeaders,
    message: `Deploy from platform-middleware: ${gitSha}`,
  });

  console.log('Successfully run Terraform', {
    gitSha,
    resultId: runResult.id,
  });
}

export async function patchGuardianServiceTF(
  workspaceName: string,
  serviceName: string,
  imageTag: string,
): Promise<void> {
  const workspaceId = await getTFWorkspaceID(workspaceName);
  const terraformApiHeaders = {
    Authorization: `Bearer ${process.env.TF_TOKEN}`,
    'Content-Type': 'application/vnd.api+json',
  };

  const [customHelmValues] = await findTerraformVariables({
    workspaceId,
    keys: ['custom_helm_values_yaml'],
    headers: terraformApiHeaders,
  });
  if (customHelmValues) {
    const lines: string[] = customHelmValues.attributes.value.split('\n');
    lines.forEach((line, index) => {
      if (line.includes(`/${serviceName}`)) {
        lines[index + 1] = `      tag        = "${imageTag}"`;
      }
    });

    const updateResults = await updateTerraformVariable({
      terraformVar: {
        id: customHelmValues.id,
        attributes: {
          ...customHelmValues.attributes,
        },
      },
      value: lines.join('\n'),
      headers: terraformApiHeaders,
    });

    console.log('custom_helm_values_yaml patched', updateResults);
  }
}
