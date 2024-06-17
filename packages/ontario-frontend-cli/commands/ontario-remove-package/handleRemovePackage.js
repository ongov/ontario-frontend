const path = require('path');
const inquirer = require('inquirer');
const fs = require('fs');
const { PACKAGES_CONFIG } = require('../../core/config');
const { uninstallPackages } = require('../../core/operations');
const logger = require('../../core/utils/logger');
const {
  handleRemovePackage,
} = require('../../core/utils/process/removePackage');
const { ontarioRemovePackageQuestions } = require('../../core/questions');
const { withErrorHandling } = require('../../core/errors/errorHandler');

/**
 * This function triggers the CLI to ask the user a confirmation question on
 * whether they want to remove the selected package. If they select "no" the process will exit.
 *
 * @param {String|Object} cmd - The input value from the user when running the
 * ontario-remove-package command. e.g. "eslint" or "prettier".
 * @returns {Promise<void>} A promise that resolves when the confirmation is complete.
 */
async function confirmPackageRemoval(cmd = {}) {
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
  await confirmPackageRemoval(cmd);

  const packageConfig = PACKAGES_CONFIG[cmd];

  if (!packageConfig) {
    const availablePackages = Object.keys(PACKAGES_CONFIG).join(', ');
    logger.error(
      `Invalid package option selected. Please select a valid package. Available packages are: ${availablePackages}`,
    );
    return;
  }

  try {
    logger.info(`Removal process for ${cmd} started.`);
    await uninstallPackages(packageConfig.packages, true, {
      cwd: process.cwd(),
    });
    logger.debug(`Packages for ${cmd} uninstalled.`);

    await checkAndWarnMissingConfigFiles(cmd);

    await handleRemovePackage(path.resolve(process.cwd()), cmd);
    logger.info(`Removal process for ${cmd} completed.`);
  } catch (error) {
    const errorMessage = error.message
      ? error.message
      : 'Failed to uninstall package.';
    logger.error(errorMessage, error);
  }
}

/**
 * Checks for the existence of specific configuration files and logs warnings if they are not found.
 *
 * @param {string} cmd - The package being removed (e.g., "eslint" or "prettier").
 */
async function checkAndWarnMissingConfigFiles(cmd) {
  const configFiles = PACKAGES_CONFIG[cmd]?.configFiles;

  (configFiles || []).forEach(({ destination, warningMessage }) => {
    if (!fs.existsSync(destination)) {
      logger.warning(warningMessage);
    }
  });
}

module.exports = {
  handleRemovePackageCommand: withErrorHandling(handleRemovePackageCommand),
};
