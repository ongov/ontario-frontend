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
  logger.info(`Removal process for ${cmd} started.`);

  if (!PACKAGES_CONFIG[cmd]) {
    logger.error(
      'Invalid package option selected. Please select either "eslint" or "prettier".',
    );
    return;
  }

  try {
    logger.info(`Removal process for ${cmd} started.`);
    await uninstallPackages(PACKAGES_CONFIG[cmd]?.packages, true, {
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
  const configFiles = {
    eslint: ['.eslintrc.js'],
    prettier: ['.prettierrc.js', '.prettierignore'],
  };

  (configFiles[cmd] || []).forEach((file) => {
    if (!fs.existsSync(file)) {
      logger.warning(`${file} not found.`);
    }
  });
}

module.exports = {
  handleRemovePackageCommand: withErrorHandling(handleRemovePackageCommand),
};
