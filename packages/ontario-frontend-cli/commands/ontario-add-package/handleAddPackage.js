const path = require('path');
const inquirer = require('inquirer');
const { PACKAGES_CONFIG } = require('../../core/config');
const { installPackages } = require('../../core/operations');
const { addPackagesQuestion } = require('../../core/questions');
const {
  extractChildObjectValuesByKey,
} = require('../../core/utils/datastructures/objectUtils');
const logger = require('../../core/utils/logger');
const {
  handlePackageFilesCopy,
} = require('../../core/utils/process/copyPackage');
const { withErrorHandling } = require('../../core/errors/errorHandler');
const AddPackageError = require('../../core/errors/AddPackageError');
const {
  isOntarioFrontendProject,
  isPackageInstalled,
  checkExistingConfigFiles,
} = require('../../core/utils/project/packageUtils');

/**
 * Prompts the user to select packages to install.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of selected package names to be installed.
 */
async function selectPackagestoInstall() {
  logger.debug('Prompting packages to install questions.');

  const questions = addPackagesQuestion();
  const answers = await inquirer.prompt(questions);

  if (!answers.addPackages.length) {
    logger.error('No packages selected.');
    process.exit(1);
  }

  logger.info(`Packages selected: ${answers.addPackages.join(', ')}.`);

  return answers.addPackages;
}

/**
 * Add Ontario packages to the project.
 */
async function handleAddPackageCommand() {
  logger.debug(`Starting handleAddPackageCommand().`);

  const projectDir = process.cwd();
  logger.debug(`Current project directory: ${projectDir}`);

  // returns an array with the user selected options
  const userSelection = await selectPackagestoInstall();
  logger.debug('End of package removal questions.');

  // Based on the user selection, we will trim the PACKAGES_CONFIG object
  // to only include keys aligning to the selected packages
  const trimmedConfig = Object.fromEntries(
    Object.entries(PACKAGES_CONFIG).filter(([key]) =>
      userSelection.includes(key),
    ),
  );

  // Without .flat() this will return an array of arrays container both eslint and prettier packages
  // Flat collapses it all into one array
  const packagesToInstall = extractChildObjectValuesByKey(
    trimmedConfig,
    'packages',
  ).flat();

  logger.debug('Related packages based on user selection input:');
  logger.debug(JSON.stringify(packagesToInstall));

  // an array of true/false values depending on if each package is installed
  const arePackagesInstalled = await Promise.all(
    packagesToInstall.map(async (pkg) => {
      const isInstalled = await isPackageInstalled(projectDir, pkg);
      if (isInstalled) {
        logger.warning(`${pkg} is already installed. Skipping installation.`);
      }
      return isInstalled;
    }),
  );

  // Filter the list of packages to installed based on if any are already installed
  const filteredPackagesToInstall = packagesToInstall.filter(
    (_, index) => !arePackagesInstalled[index],
  );
  logger.debug(`Packages to install (ignoring those which may already be installed): ${JSON.stringify(filteredPackagesToInstall)}`);

  if (filteredPackagesToInstall.length) {
    try {
      await installPackages(filteredPackagesToInstall, true);
    } catch (error) {
      const errorMessage = error.message || 'Failed to install package.';
      logger.error(
        `Error occurred during package installation: ${errorMessage}`,
      );
      throw new AddPackageError(
        'handleAddPackageCommand',
        filteredPackagesToInstall,
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
        const configFilesExist = await checkExistingConfigFiles(
          packageConfig.configFiles,
        );
        logger.debug(
          `Config files existence status for ${pkg}: ${configFilesExist}`,
        );

        if (configFilesExist) {
          logger.info(
            `One or more configuration files for ${pkg} already exist.`,
          );
        } else {
          await handlePackageFilesCopy(path.resolve(projectDir), pkg);
        }
      } catch (error) {
        const errorMessage =
          error.message || 'Failed to copy package configuration.';
        logger.error(
          `Error occurred during package configuration copy: ${errorMessage}`,
        );
      }
    }),
  );
}

module.exports = {
  handleAddPackageCommand: withErrorHandling(
    handleAddPackageCommand,
    AddPackageError,
  ),
};
