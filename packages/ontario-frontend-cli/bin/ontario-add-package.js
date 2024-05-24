#!/usr/bin/env node
const Command = require('commander').Command;
const Argument = require('commander').Argument;
const { handleAddOntarioPackageCommand } = require('../commands/ontario-add-package/handleAddPackage');
const { ROOT_DIR } = require('../core/config');
const { readPackageJson } = require('../core/utils');
const logger = require('../core/utils/logger');
const { doesPackageJsonExist, isOntarioFrontendProject } = require('../core/validation');

const program = new Command();

/**
 * readPackageJson() is an async function that is used to read the contents of the package.json file.
 * 
 * These contents are checked against in several places in the below code, therefore the all of the 
 * program commands should be wrapped in a self-executing async function.
 * 
 * Without this async wrapper function, the program will exit unexpectedly after user input.
 */ 
(
  async () => {
    const packageJson = async() => await readPackageJson(ROOT_DIR);

    program
      .name('add-ontario-package')
      .version(packageJson.version, '-v, --version', 'Output the current version');
      // TODO: Add a description to package.json
      // .description(packageJson.description);

    program.addHelpText(
      'after',
      `\n"eslint" and "prettier" are the available packages to add to your project. For more information, visit our developer site at https://developer.ontario.ca`,
    );

    program
      .addArgument(new Argument('<package>', 'An Ontario package').choices(['eslint', 'prettier']))

    program
      .description('Add additional Ontario packages to your project.')
      .option(
        '--local',
        'Use a local version of the Ontario package dependency',
      )
      .action(async (options) => {
        if (!await doesPackageJsonExist()) {
          logger.error("package.json file not found.");
          process.exit(1);
        }
        if (!await isOntarioFrontendProject()) {
          logger.error("Ontario Frontend package not found within package.json as a dependency.");
          process.exit(1);
        }
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
  }
)();
