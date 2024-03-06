#!/usr/bin/env node

const handleCreateCommand = require('../create-ontario-app/handleCreate.js');

// Import necessary modules
const Command = require('commander').Command;
const program = new Command();

const readPackageJson = require('../utils/file-read.js').readPackageJson;

// Asynchronously read the package.json file
readPackageJson().then((packageJson) => {
  // Configure the CLI with the version and description from package.json
  program
    .version(packageJson.version, '-v, --VERSION')
    .description(packageJson.description);
});

// Define a new command for creating a Ontario Frontend project
program
  .description('Create a new Ontario Frontend project')
  .option('--local', 'Use a local version of the Ontario Frontend core dependency')
  .action((cmd) => {
    // The action to perform when the command is executed
    handleCreateCommand(cmd);
  });
// Parse the command line arguments and execute the corresponding command
program.parse(process.argv);
