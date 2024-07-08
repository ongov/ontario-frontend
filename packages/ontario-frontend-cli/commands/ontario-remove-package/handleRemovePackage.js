const path = require('path');
const inquirer = require('inquirer');
const { PACKAGES_CONFIG } = require('../../core/config');
const { uninstallPackages } = require('../../core/operations');
const logger = require('../../core/utils/logger');
const { extractChildObjectValuesByKey } = require('../../core/utils/datastructures/objectUtils');
const {
  handleRemovePackage,
} = require('../../core/utils/process/removePackage');
const { removePackagesQuestion, confirmRemovalQuestion } = require('../../core/questions');
const { withErrorHandling } = require('../../core/errors/errorHandler');
const RemovePackageError = require('../../core/errors/RemovePackageError');
const {
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
async function confirmPackageRemoval() {
  logger.debug('Beginning to ask package removal questions.');
  
  const removePackagesAnswer = await inquirer.prompt(removePackagesQuestion());

  logger.debug('Packages selected to remove:');
  logger.debug(JSON.stringify(removePackagesAnswer));

  
  if (!removePackagesAnswer.removePackages.length) {
    logger.error('No packages selected. Exiting the package removal process.');
    process.exit(1);
  }

  const confirmRemovalAnswer = await inquirer.prompt(confirmRemovalQuestion(removePackagesAnswer.removePackages));

  logger.debug('Confirm removal value:');
  logger.debug(JSON.stringify(confirmRemovalAnswer));

  if (confirmRemovalAnswer.confirmRemoval === false) {
    logger.error('Package removal confirmation not given. Exiting the package removal process.');
    process.exit(1);
  }

  logger.debug('Exiting package removal questions.');

  return removePackagesAnswer.removePackages;
}

/**
 * Remove Ontario packages from the project.
 *
 * @param {String|Object} cmd - The input value from the user when running the
 * ontario-remove-package command. e.g. "eslint" or "prettier".
 * @returns {Promise<void>} A promise that resolves when the package removal is complete.
 */
async function handleRemovePackageCommand() {
  logger.debug('Starting handleRemovePackageCommand().');

  const projectDir = process.cwd();
  logger.debug(`Current project directory: ${projectDir}`);

  // returns an array with the user selected options
  const userSelection = await await confirmPackageRemoval();;

  // Based on the user selection, we will trim the PACKAGES_CONFIG object
  // to only include keys aligning to the selected packages
  let trimmedConfig = {};
  Object.keys(PACKAGES_CONFIG).forEach(key => userSelection.includes(key) ? trimmedConfig[key] = {...PACKAGES_CONFIG[key]} : null);

  // Without .flat() this will return an array of arrays container both eslint and prettier packages
  // Flat collapses it all into one array
  const packagesToUninstall = extractChildObjectValuesByKey(trimmedConfig, "packages").flat();
  logger.info('user selection');
  logger.info(JSON.stringify(userSelection));
  logger.info('packages to uninstall');
  logger.info(JSON.stringify(packagesToUninstall));

  // an array of true/false values depending on if each package is installed
  const arePackagesInstalled = await Promise.all([...packagesToUninstall].map(async (package) => {
    const isInstalled = await isPackageInstalled(projectDir, package);
    if (isInstalled == false) {
      logger.warning(`${package} is not installed. Skipping removal.`);
    }
    return isInstalled;
  }));

  logger.info(JSON.stringify(arePackagesInstalled));

  // Filter the list of packages to installed based on if any are already installed
  const filteredPackagesToUninstall = packagesToUninstall.filter((value, index) => arePackagesInstalled[index]);

  logger.info(JSON.stringify(filteredPackagesToUninstall));

  if (filteredPackagesToUninstall.length) {
    try {
      await uninstallPackages(filteredPackagesToUninstall, true);
    } catch (error) {
      const errorMessage = error.message
        ? error.message
        : 'Failed to uninstall package.';
      logger.error(`Error occurred during package removal: ${errorMessage}`);
      throw new RemovePackageError(
        'handleRemovePackageCommand',
        [],
        errorMessage,
      );
    }
  }

  process.exit(1);

  const packageConfig = PACKAGES_CONFIG[cmd];
  logger.debug(`Package config for ${cmd}: ${JSON.stringify(packageConfig)}`);

  if (!packageConfig) {
    const availablePackages = Object.keys(PACKAGES_CONFIG).join(', ');
    logger.error(
      `Invalid package option selected. Please select a valid package. Available packages are: ${availablePackages}`,
    );
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
        await handlePackageFilesRemoval(path.resolve(projectDir), cmd);
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
