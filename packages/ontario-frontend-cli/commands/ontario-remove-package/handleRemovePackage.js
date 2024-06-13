const path = require('path');
const inquirer = require('inquirer');
const fs = require('fs');
const { PACKAGES_CONFIG } = require('../../core/config');
const { uninstallPackages } = require('../../core/operations');
const logger = require('../../core/utils/logger');
const { handleRemovePackage } = require('../../core/utils/process/removePackage');
const { ontarioRemovePackageQuestions } = require('../../core/questions');

/**
 * This function triggers the CLI to ask the user a confirmation question on 
 * whether they want to remove the selected package. If they select "no" the process will exit.
 * 
 * @param {String|Object} cmd - The input value from the user when running the 
 * ontario-remove-package command. e.g. "eslint" or "prettier".
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
 */
async function handleRemovePackageCommand(cmd = {}) {

  await confirmPackageRemoval(cmd);

  try {
    switch (cmd) {
      case 'eslint':
        logger.info(`Removal process for ${cmd} started.`);

        await uninstallPackages(PACKAGES_CONFIG[cmd]?.packages, true);

        if (!fs.existsSync(".eslintrc.js"))
          logger.warning(".eslint.js not found.");

        await handleRemovePackage(path.resolve(process.cwd()), cmd);
        break;
      case 'prettier':
        logger.info(`Removal process for ${cmd} started.`);

        await uninstallPackages(PACKAGES_CONFIG[cmd]?.packages, true);

        if (!fs.existsSync(".prettierrc.js"))
          logger.warning(".prettierrc.js not found.");

        if (!fs.existsSync(".prettierignore"))
          logger.warning(".prettierignore not found.");

        await handleRemovePackage(path.resolve(process.cwd()), cmd);
        break;
      default:
        logger.error('Invalid package option selected. Please select either "eslint" or "prettier".');
    }
  } catch (error) {
    const errorMessage = error.message ? error.message : 'Failed to uninstall package.';
    logger.error(errorMessage, error);
  }
}

module.exports = { handleRemovePackageCommand };