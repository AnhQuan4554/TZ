import { deploy } from './gke/index';

const handler = async ({ context, imageName }: any) => {
  const workingDir = context || process.env.INIT_CWD;
  process.chdir(workingDir);

  await deploy(imageName);
};
const command = 'gke [context]';
const desc = 'Build and publish docker image to GKE and deploy using helm';
const builder = {
  context: {
    aliases: ['context', 'c'],
    type: 'string',
    required: false,
    desc: 'The working directory',
  },
  chart: {
    aliases: ['c', 'chart'],
    type: 'string',
    required: false,
    desc: 'Path of heml chart file',
  },

  imageName: {
    aliases: ['n', 'imageName'],
    type: 'string',
    required: true,
    desc: 'name of docker image',
  },
  
  dryRun: {
    aliases: ['d', 'dry-run'],
    type: 'boolean',
    required: false,
    desc: 'Dry-run only',
  },
};
export { command, desc, builder, handler };
