const path = require('path');
const { PACKAGES_CONFIG } = require('../../core/config');
const { installPackages } = require('../../core/operations');
const logger = require('../../core/utils/logger');
const { handlePackageCopy } = require('../../core/utils/process/copyPackage');
const { withErrorHandling } = require('../../core/errors/errorHandler');
const AddPackageError = require('../../core/errors/AddPackageError');
const {
  isOntarioFrontendProject,
  isPackageInstalled,
  checkExistingConfigFiles,
} = require('../../core/utils/project/packageUtils');

/**
 * Add Ontario packages to the project.
 *
 * @param {String} cmd - The name of the package to add (e.g., "eslint" or "prettier").
 *
 */
async function handleAddPackageCommand(cmd = {}) {
  logger.debug(`Starting handleAddPackageCommand with cmd: ${cmd}`);
  const packageConfig = PACKAGES_CONFIG[cmd];
  logger.debug(`Package config for ${cmd}: ${JSON.stringify(packageConfig)}`);

  if (!packageConfig) {
    const availablePackages = Object.keys(PACKAGES_CONFIG).join(', ');
    logger.error(
      `Invalid package option selected. Please select a valid package. Available packages are: ${availablePackages}`,
    );
    return;
  }

  try {
    const projectDir = process.cwd();
    logger.debug(`Current project directory: ${projectDir}`);

    // If the current project is not an Ontario Frontend project,
    // do not try adding the package.
    if (!(await isOntarioFrontendProject(projectDir))) {
      logger.error('This is not an Ontario Frontend project');
      return;
    }

    // Check if the package is already installed
    const packageAlreadyInstalled = await isPackageInstalled(projectDir, cmd);
    logger.debug(
      `Package installed status for ${cmd}: ${packageAlreadyInstalled}`,
    );
    const configFilesExist = await checkExistingConfigFiles(
      packageConfig.configFiles,
    );
    logger.debug(
      `Config files existence status for ${cmd}: ${configFilesExist}`,
    );

    if (packageAlreadyInstalled) {
      logger.info(`${cmd} is already installed.`);
    } else {
      logger.info(`Installation process for ${cmd} started.`);
      logger.debug(`Package configuration: ${JSON.stringify(packageConfig)}`);
      logger.debug(`Project directory: ${projectDir}`);

      await installPackages(packageConfig.packages, true);
      logger.debug(
        `Packages ${packageConfig.packages.join(', ')} installed successfully.`,
      );
    }

    if (configFilesExist) {
      logger.info(`One or more configuration files for ${cmd} already exist.`);
    } else {
      await handlePackageCopy(path.resolve(projectDir), cmd);
      logger.success(`Configuration files for ${cmd} copied successfully.`);
    }

    if (packageAlreadyInstalled && configFilesExist) {
      logger.info(
        `The ${cmd} package and configuration files are already present. No further action required.`,
      );
    } else {
      logger.success(`Installation process for ${cmd} completed.`);
    }
  } catch (error) {
    const errorMessage = error.message
      ? error.message
      : 'Failed to install package.';
    logger.error(`Error occurred during package installation: ${errorMessage}`);
    throw new AddPackageError('handleAddPackageCommand', [cmd], errorMessage);
  }
}

module.exports = {
  handleAddPackageCommand: withErrorHandling(
    handleAddPackageCommand,
    AddPackageError,
  ),
};
