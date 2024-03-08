#!/usr/bin/env node

const handleCreateCommand = require('../create/create.js');

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

// Define a new command for creating a Ontario.ca Frontend project
program
  .description('Create a new Ontario.ca Frontend project')
  .option('--local', 'Use a local version of the Ontario.ca Frontend core dependency')
  .action((cmd) => {
    // The action to perform when the command is executed
    handleCreateCommand(cmd);
  });
// Parse the command line arguments and execute the corresponding command
program.parse(process.argv);
