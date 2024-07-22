#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);

const command = args[0];

const scriptMap = {
  'ontario-create-app': path.join(__dirname, 'ontario-create-app.js'),
  'ontario-add-package': path.join(__dirname, 'ontario-add-package.js'),
  'ontario-remove-package': path.join(__dirname, 'ontario-remove-package.js'),
};

if (scriptMap[command]) {
  spawnSync('node', [scriptMap[command], ...args.slice(1)], {
    stdio: 'inherit',
  });
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
