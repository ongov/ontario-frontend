#!/usr/bin/env node

const Command = require('commander').Command;
const Argument = require('commander').Argument;
const {
  handleAddOntarioPackageCommand,
} = require('../commands/add-ontario-package/handleAddOntarioPackage');
const { readPackageJson } = require('../core/utils');
const logger = require('../core/utils/logger');

const packageJson = readPackageJson();

const program = new Command();

program
  .name('add-ontario-package')
  .version(packageJson.version, '-v, --version', 'Output the current version')
  .description(packageJson.description);

program
  .addArgument(new Argument('<package>', 'An Ontario package').choices(['eslint', 'prettier']))


program
  .description('Add additional Ontario packages to your project.')
  .option(
    '--local',
    'Use a local version of the Ontario package dependency',
  )
  .action(async (options) => {
    try {
      await handleAddOntarioPackageCommand(options);
    } catch (error) {
      logger.error(`Error installing package: ${error.message}`);
      process.exit(1);
    }
  });

// Error on unknown commands should not interfere with the help option
program.on('command:*', (operands) => {
  console.error(
    `Invalid command: ${operands[0]}\nSee --help for a list of available commands.`,
  );
  process.exit(1);
});

// Ensure the help information is displayed when the user explicitly asks for it
program
  .command('help')
  .description('Display help information and resources')
  .action(() => {
    program.help();
  });

program.parse(process.argv);
