#!/usr/bin/env node

const args = process.argv.slice(2);
const message = args[0];

if (message === 'no-configured-linter') {
  console.error('No configured linter. Please set up ESLint in your project.');
  process.exit(1);
}
