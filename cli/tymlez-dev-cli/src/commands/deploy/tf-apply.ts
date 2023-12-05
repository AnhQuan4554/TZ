import assert from 'assert';
import { applyTerraform } from './backend/terraform';

const handler = async () => {
  assert(process.env.ENV, 'ENV is missing');
  assert(process.env.TF_TOKEN, 'TF_TOKEN is missing');
  assert(process.env.GIT_SHA, 'GIT_SHA is missing');
  assert(process.env.CLIENT_NAME, 'CLIENT_NAME is missing');
  const TF_WS_PREFIX = process.env.TARGET_TF_WS_NAME || `${process.env.CLIENT_NAME}-${process.env.ENV}`;
  applyTerraform({
    gitSha: process.env.GIT_SHA,
    tfToken: process.env.TF_TOKEN,
    workspaceName: TF_WS_PREFIX,
  });
};
const command = 'tf-apply';
const desc = 'Run Terraform apply';
const builder = {};
export { command, desc, builder, handler };
