#!/usr/bin/env node
const { Command, Argument } = require('commander');
const {
  handleAddPackageCommand,
} = require('../commands/ontario-add-package/handleAddPackage');
const { ROOT_DIR } = require('../core/config');
const { readPackageJson } = require('../core/utils/project/readPackageJson');
const logger = require('../core/utils/logger');
const {
  isOntarioFrontendProject,
  doesPackageJsonExist,
} = require('../core/utils/project/packageUtils');

const program = new Command();

/**
 * Initialize the CLI program.
 * This function reads the package.json, sets up the CLI commands, and handles any initialization errors.
 * It is wrapped in an async function to properly handle asynchronous operations.
 */
async function initializeProgram() {
  try {
    const packageJson = await readPackageJson(ROOT_DIR);

    program
      .name('ontario-add-package')
      .version(
        packageJson.version,
        '-v, --version',
        'Output the current version',
      )
      .description('Add additional Ontario packages to your project.');

    program.addHelpText(
      'after',
      `\n"eslint" and "prettier" are the available packages to add to your project. For more information, visit our developer site at https://developer.ontario.ca`,
    );

    program
      .addArgument(
        new Argument('<package>', 'An Ontario package').choices([
          'eslint',
          'prettier',
        ]),
      )
      .option(
        '--local',
        'Use a local version of the Ontario package dependency',
      )
      .option('--debug', 'Enable debug output')
      .action(handleAddPackageAction);

    program
      .command('help')
      .description('Display help information and resources')
      .action(() => {
        program.help();
      });

    // Error on unknown commands should not interfere with the help option
    program.on('command:*', (operands) => {
      console.error(
        `Invalid command: ${operands[0]}\nSee --help for a list of available commands.`,
      );
      process.exit(1);
    });

    program.parse(process.argv);
  } catch (error) {
    logger.error(`Initialization failed: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Handle the add package action.
 *
 * @param {string} pkg - The package to add.
 * @param {Object} cmd - The command object containing user inputs and options.
 */
async function handleAddPackageAction(pkg, cmd) {
  logger.setDebug(cmd.debug);
  logger.debug('CLI options:', cmd);

  const projectDir = process.cwd();

  if (!(await doesPackageJsonExist(projectDir))) {
    logger.error('package.json file not found.');
    process.exit(1);
  }

  if (!(await isOntarioFrontendProject(projectDir))) {
    logger.error(
      'Ontario Frontend package not found within package.json as a dependency.',
    );
    process.exit(1);
  }

  try {
    await handleAddPackageCommand(pkg);
  } catch (error) {
    logger.error(`Error installing package: ${error.message}`);
    process.exit(1);
  }
}

// Initialize the CLI program using an async wrapper to handle asynchronous operations gracefully
initializeProgram();
