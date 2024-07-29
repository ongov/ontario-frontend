#!/usr/bin/env node

const { exec } = require('child_process');
const args = process.argv.slice(2);
const failMessage = args
  .find((arg) => arg.startsWith('--fail-message'))
  .split('=')[1];
const command = args
  .filter((arg) => !arg.startsWith('--fail-message'))
  .join(' ');

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(failMessage);
    process.exit(error.code);
  } else {
    console.log(stdout);
    process.exit(0);
  }
});
