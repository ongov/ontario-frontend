const path = require('path');
const inquirer = require('inquirer');
const { PACKAGES_CONFIG } = require('../../core/config');
const { uninstallPackages } = require('../../core/operations');
const logger = require('../../core/utils/logger');
const {
  handleRemovePackage,
} = require('../../core/utils/process/removePackage');
const { ontarioRemovePackageQuestions } = require('../../core/questions');
const { withErrorHandling } = require('../../core/errors/errorHandler');
const RemovePackageError = require('../../core/errors/RemovePackageError');
const {
  isOntarioFrontendProject,
  isPackageInstalled,
  checkExistingConfigFiles,
  doesFileExist,
} = require('../../core/utils/project/packageUtils');

/**
 * This function triggers the CLI to ask the user a confirmation question on
 * whether they want to remove the selected package. If they select "no" the process will exit.
 *
 * @param {String|Object} cmd - The input value from the user when running the
 * ontario-remove-package command. e.g. "eslint" or "prettier".
 * @returns {Promise<void>} A promise that resolves when the confirmation is complete.
 */
async function confirmPackageRemoval(cmd = {}) {
  logger.debug(`Confirming package removal for: ${cmd}`);
  const questions = ontarioRemovePackageQuestions(cmd);
  const answers = await inquirer.prompt(questions);

  if (answers.removePackage === false) {
    logger.info('Exiting the package removal process.');
    process.exit(1);
  }
}

/**
 * Remove Ontario packages from the project.
 *
 * @param {String|Object} cmd - The input value from the user when running the
 * ontario-remove-package command. e.g. "eslint" or "prettier".
 * @returns {Promise<void>} A promise that resolves when the package removal is complete.
 */
async function handleRemovePackageCommand(cmd = {}) {
  logger.debug(`Starting handleRemovePackageCommand with cmd: ${cmd}`);
  await confirmPackageRemoval(cmd);
  logger.info(`Removal process for ${cmd} started.`);

  const packageConfig = PACKAGES_CONFIG[cmd];
  logger.debug(`Package config for ${cmd}: ${JSON.stringify(packageConfig)}`);

  if (!packageConfig) {
    const availablePackages = Object.keys(PACKAGES_CONFIG).join(', ');
    logger.error(
      `Invalid package option selected. Please select a valid package. Available packages are: ${availablePackages}`,
    );
    return;
  }

  const projectDir = process.cwd();
  logger.debug(`Current project directory: ${projectDir}`);

  // Check if the current project is an Ontario Frontend project
  if (!(await isOntarioFrontendProject(projectDir))) {
    logger.error('This is not an Ontario Frontend project.');
    return;
  }

  // Check if the package is installed
  const packageInstalled = await isPackageInstalled(projectDir, cmd);
  logger.debug(`Package installed status for ${cmd}: ${packageInstalled}`);
  const configFilesExist = await checkExistingConfigFiles(
    packageConfig.configFiles,
  );
  logger.debug(`Config files existence status for ${cmd}: ${configFilesExist}`);

  // If the package is not installed and there are no config files, don't bother
  if (!packageInstalled && !configFilesExist) {
    logger.info(`${cmd} is not installed.`);
    return;
  }

  try {
    // Uninstall the necessary packages
    logger.info(`Removing packages: ${packageConfig.packages.join(', ')}`);
    await uninstallPackages(packageConfig.packages, true, {
      cwd: projectDir,
    });

    for (const configFile of packageConfig.configFiles) {
      logger.debug(
        `Checking if configuration file exists: ${configFile.destination}`,
      );
      if (await doesFileExist(configFile.destination)) {
        logger.info(`Removing configuration file: ${configFile.destination}`);
        await handleRemovePackage(path.resolve(projectDir), cmd);
      }
    }

    logger.success(`Removal process for ${cmd} completed.`);
  } catch (error) {
    const errorMessage = error.message
      ? error.message
      : 'Failed to uninstall package.';
    logger.error(`Error occurred during package removal: ${errorMessage}`);
    throw new RemovePackageError(
      'handleRemovePackageCommand',
      [cmd],
      errorMessage,
    );
  }
}

module.exports = {
  handleRemovePackageCommand: withErrorHandling(
    handleRemovePackageCommand,
    RemovePackageError,
  ),
};
