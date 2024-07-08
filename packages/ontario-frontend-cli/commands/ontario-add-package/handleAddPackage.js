const path = require('path');
const inquirer = require('inquirer');
const { PACKAGES_CONFIG } = require('../../core/config');
const { installPackages } = require('../../core/operations');
const { addPackagesQuestion } = require('../../core/questions');
const { extractChildObjectValuesByKey } = require('../../core/utils/datastructures/objectUtils');
const logger = require('../../core/utils/logger');
const { handlePackageFilesCopy } = require('../../core/utils/process/copyPackage');
const { withErrorHandling } = require('../../core/errors/errorHandler');
const AddPackageError = require('../../core/errors/AddPackageError');
const {
  isOntarioFrontendProject,
  isPackageInstalled,
  checkExistingConfigFiles,
} = require('../../core/utils/project/packageUtils');

/**
 * This function triggers the CLI to ask the user a confirmation question on
 * whether they want to remove the selected package. If they select "no" the process will exit.
 *
 * @param {String|Object} cmd - The input value from the user when running the
 * ontario-remove-package command. e.g. "eslint" or "prettier".
 * @returns {Promise<void>} A promise that resolves when the confirmation is complete.
 */
async function selectPackagestoInstall() {
  logger.debug('Asking package selection question.');

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

  // If the current project is not an Ontario Frontend project,
  // do not try adding the package.
  if (!(await isOntarioFrontendProject(projectDir))) {
    logger.error('This is not an Ontario Frontend project');
    return;
  }



  // returns an array with the user selected options
  const userSelection = await selectPackagestoInstall();

  // Based on the user selection, we will trim the PACKAGES_CONFIG object
  // to only include keys aligning to the selected packages
  let trimmedConfig = {};
  Object.keys(PACKAGES_CONFIG).forEach(key => userSelection.includes(key) ? trimmedConfig[key] = {...PACKAGES_CONFIG[key]} : null);

  // Without .flat() this will return an array of arrays container both eslint and prettier packages
  // Flat collapses it all into one array
  const packagesToInstall = extractChildObjectValuesByKey(trimmedConfig, "packages").flat();
  
  logger.debug('Related packages based on user selection input:');
  logger.debug(JSON.stringify(packagesToInstall));

  // an array of true/false values depending on if each package is installed
  const arePackagesInstalled = await Promise.all([...packagesToInstall].map(async (package) => {
    const isInstalled = await isPackageInstalled(projectDir, package);
    if (isInstalled !== false) {
      logger.warning(`${package} is already installed. Skipping installation.`);
    }
    return isInstalled;
  }));

  // Filter the list of packages to installed based on if any are already installed
  const filteredPackagesToInstall = packagesToInstall.filter((value, index) => !arePackagesInstalled[index]);

  logger.debug('Packages that are not yet installed:');
  logger.debug(JSON.stringify(filteredPackagesToInstall));

  if (filteredPackagesToInstall.length) {
    try {
      await installPackages(filteredPackagesToInstall, true);
    } catch (error) {
      const errorMessage = error.message
        ? error.message
        : 'Failed to install package.';
      logger.error(`Error occurred during package installation: ${errorMessage}`);
      throw new AddPackageError('handleAddPackageCommand', filteredPackagesToInstall, errorMessage);
    }
  }

  userSelection.map(async (package) => {
    const packageConfig = PACKAGES_CONFIG[package];
    logger.debug(`Package config for ${package}: ${JSON.stringify(packageConfig)}`);
  
    if (!packageConfig) {
      const availablePackages = Object.keys(PACKAGES_CONFIG).join(', ');
      logger.error(
        `Invalid package option selected. Please select a valid package. Available packages are: ${availablePackages}`,
      );
      return;
    }
  
    try {

      const configFilesExist = await checkExistingConfigFiles(
        packageConfig.configFiles,
      );
      logger.debug(
        `Config files existence status for ${package}: ${configFilesExist}`,
      );
  
      if (configFilesExist) {
        logger.info(`One or more configuration files for ${package} already exist.`);
      } else {
        await handlePackageFilesCopy(path.resolve(projectDir), package);
        logger.success(`Configuration files for ${package} copied successfully.`);
      }
    } catch (error) {
      const errorMessage = error.message
        ? error.message
        : 'Failed to copy package configuration.';
      logger.error(`Error occurred during package configuration copy: ${errorMessage}`);
    }
  });
}

module.exports = {
  handleAddPackageCommand: withErrorHandling(
    handleAddPackageCommand,
    AddPackageError
  ),
};
