import type { Argv } from 'yargs';

const handler = () => {
  console.log('please run --help to see other options');
};
const command = 'hashgraph';
const desc = 'onchain tools';
const builder = (yargs: Argv) =>
  yargs
    .commandDir(command, {
      extensions: ['ts', 'js'],
      recurse: false,
      exclude: /test|d\.ts/,
    })
    .demandCommand();
export { command, desc, builder, handler };
