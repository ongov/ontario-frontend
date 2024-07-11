const path = require('path');
const inquirer = require('inquirer');
const { PACKAGES_CONFIG } = require('../../core/config');
const { uninstallPackages } = require('../../core/operations');
const logger = require('../../core/utils/logger');
const {
  extractChildObjectValuesByKey,
} = require('../../core/utils/datastructures/objectUtils');
const {
  removePackagesQuestion,
  confirmRemovalQuestion,
} = require('../../core/questions');
const { withErrorHandling } = require('../../core/errors/errorHandler');
const RemovePackageError = require('../../core/errors/RemovePackageError');
const {
  isPackageInstalled,
  checkAndRemoveConfigFiles,
} = require('../../core/utils/project/packageUtils');

/**
 * Prompts the user to confirm package removal.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of package names to be removed.
 */
async function confirmPackageRemoval() {
  logger.debug('Prompting package removal questions.');

  const { removePackages } = await inquirer.prompt(removePackagesQuestion());
  logger.debug(
    `Packages selected to remove: ${JSON.stringify(removePackages)}`,
  );

  if (!removePackages.length) {
    logger.error('No packages selected. Exiting the package removal process.');
    process.exit(1);
  }

  const { confirmRemoval } = await inquirer.prompt(
    confirmRemovalQuestion(removePackages),
  );
  logger.debug(`Confirm removal value: ${JSON.stringify(confirmRemoval)}`);

  if (!confirmRemoval) {
    logger.error(
      'Package removal confirmation not given. Exiting the package removal process.',
    );
    process.exit(1);
  }

  logger.debug('Exiting package removal questions.');
  return removePackages;
}

/**
 * Remove Ontario packages from the project.
 *
 * @returns {Promise<void>} A promise that resolves when the package removal is complete.
 */
async function handleRemovePackageCommand() {
  logger.debug('Starting handleRemovePackageCommand().');

  const projectDir = process.cwd();
  logger.debug(`Current project directory: ${projectDir}`);

  // returns an array with the user selected options
  const userSelection = await confirmPackageRemoval();
  logger.debug(`user selection: ${JSON.stringify(userSelection)}`);

  // Based on the user selection, we will trim the PACKAGES_CONFIG object
  // to only include keys aligning to the selected packages
  const trimmedConfig = Object.fromEntries(
    Object.entries(PACKAGES_CONFIG).filter(([key]) =>
      userSelection.includes(key),
    ),
  );

  // Without .flat() this will return an array of arrays container both eslint and prettier packages
  // Flat collapses it all into one array
  const packagesToUninstall = extractChildObjectValuesByKey(
    trimmedConfig,
    'packages',
  ).flat();
  logger.debug(`packages to uninstall: ${JSON.stringify(packagesToUninstall)}`);

  // an array of true/false values depending on if each package is installed
  const arePackagesInstalled = await Promise.all(
    packagesToUninstall.map(async (pkg) => {
      const isInstalled = await isPackageInstalled(projectDir, pkg);
      if (!isInstalled) {
        logger.warning(`${pkg} is not installed. Skipping removal.`);
      }
      return isInstalled;
    }),
  );

  logger.debug(
    `Are packages installed? ${JSON.stringify(arePackagesInstalled)}`,
  );

  // Filter the list of packages to installed based on if any are already installed
  const filteredPackagesToUninstall = packagesToUninstall.filter(
    (_, index) => arePackagesInstalled[index],
  );
  logger.debug(
    `Packages to uninstall (ignoring those which are not installed): ${JSON.stringify(
      filteredPackagesToUninstall,
    )}`,
  );

  if (filteredPackagesToUninstall.length) {
    try {
      await uninstallPackages(filteredPackagesToUninstall, true);
    } catch (error) {
      const errorMessage = error.message || 'Failed to uninstall package.';
      logger.error(`Error occurred during package removal: ${errorMessage}`);
      throw new RemovePackageError(
        'handleRemovePackageCommand',
        filteredPackagesToUninstall,
        errorMessage,
      );
    }
  }

  await Promise.all(
    userSelection.map(async (pkg) => {
      const packageConfig = PACKAGES_CONFIG[pkg];
      logger.debug(
        `Package config for ${pkg}:`
      );
      logger.debug(JSON.stringify(packageConfig));

      if (!packageConfig) {
        const availablePackages = Object.keys(PACKAGES_CONFIG).join(', ');
        logger.error(
          `Invalid package option selected. Available packages are: ${availablePackages}`,
        );
        return;
      }

      try {
        await checkAndRemoveConfigFiles(packageConfig.configFiles);
      } catch (error) {
        const errorMessage =
          error.message || 'Failed to remove package configuration.';
        logger.error(
          `Error occurred during package configuration removal: ${errorMessage}`,
        );
      }
    }),
  );
}

module.exports = {
  handleRemovePackageCommand: withErrorHandling(
    handleRemovePackageCommand,
    RemovePackageError,
  ),
};
