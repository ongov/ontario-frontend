#!/usr/bin/env node
const { Command, Argument } = require('commander');
const {
  handleCreateAppCommand,
} = require('../commands/ontario-create-app/handleCreateApp');
const { ROOT_DIR } = require('../core/config');
const { readPackageJson } = require('../core/utils/project/readPackageJson');
const logger = require('../core/utils/logger');
const { validFileName } = require('../core/validation');

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
      .name('ontario-create-app')
      .version(
        packageJson.version,
        '-v, --version',
        'Output the current version',
      )
      .description('Create a new Ontario Frontend project');

    program.addHelpText(
      'after',
      `\nFor more information, visit our developer site at https://developer.ontario.ca`,
    );

    program
      .option(
        '--projectName <name>',
        'Specify the project name (lowercase, alphanumeric, hyphens, underscores allowed)',
        validateFileName,
      )
      .option(
        '--enPage <name>',
        'Specify the English page name (lowercase, alphanumeric, hyphens, underscores allowed)',
        validateFileName,
      )
      .option(
        '--frPage <name>',
        'Specify the French page name (lowercase, alphanumeric, hyphens, underscores allowed)',
        validateFileName,
      )
      .option(
        '--eslint [value]',
        'Include ESLint configuration (true/false)',
        (value) => value !== 'false',
      )
      .option(
        '--prettier [value]',
        'Include Prettier configuration (true/false)',
        (value) => value !== 'false',
      )
      .option('--debug', 'Enable debug output')
      .option(
        '--local',
        'Use a local version of the Ontario Frontend core dependency',
      )
      .action(handleCreateAppAction);

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
 * Handle the create app action.
 *
 * @param {Object} cmd - The command object containing user inputs and options.
 */
async function handleCreateAppAction(cmd) {
  logger.setDebug(cmd.debug);
  logger.debug('CLI options:', cmd);

  try {
    await handleCreateAppCommand(cmd);
  } catch (error) {
    logger.error(`Error creating project: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Validate the file name provided in the CLI options.
 *
 * @param {string} value - The file name to validate.
 * @returns {string} - The validated file name.
 */
function validateFileName(value) {
  const validationResult = validFileName(value);
  if (validationResult !== true) {
    logger.error('Invalid file name - ', validationResult);
    process.exit(1);
  }
  logger.info('Using file name: ', value);
  return value;
}

// Initialize the CLI program using an async wrapper to handle asynchronous operations gracefully
initializeProgram();
