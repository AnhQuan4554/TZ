#!/usr/bin/env -S node -r esbuild-register
import Yargs from 'yargs/yargs';

process.env.NEW_RELIC_ENABLED = 'false';

async function main() {
  const rootYargs = Yargs(process.argv.slice(2));

  await rootYargs
    .commandDir('./commands', {
      extensions: ['ts', 'js'],
      recurse: false,
      exclude: /d\.ts/,
    })
    .demandCommand()
    .strict()
    .help().argv;
}

main().catch((err) => {
  console.error('Failed to execute', err);
  process.exit(1);
});
