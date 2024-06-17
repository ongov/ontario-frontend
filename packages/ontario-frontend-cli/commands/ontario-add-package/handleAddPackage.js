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
  const packageConfig = PACKAGES_CONFIG[cmd];

  if (!packageConfig) {
    const availablePackages = Object.keys(PACKAGES_CONFIG).join(', ');
    logger.error(
      `Invalid package option selected. Please select a valid package. Available packages are: ${availablePackages}`,
    );
    return;
  }

  try {
    const projectDir = process.cwd();

    // If the current project is not an Ontario Frontend project,
    // do not try adding the package.
    if (!(await isOntarioFrontendProject(projectDir))) {
      logger.error('This is not an Ontario Frontend project');
      return;
    }

    // If the package is already installed, don't try to add it
    if (await isPackageInstalled(projectDir, cmd)) {
      logger.info(`${cmd} is already installed.`);
      return;
    }

    logger.info(`Installation process for ${cmd} started.`);
    logger.debug(`Package configuration: ${JSON.stringify(packageConfig)}`);
    logger.debug(`Project directory: ${projectDir}`);

    await installPackages(packageConfig.packages, true);
    logger.debug(
      `Packages ${packageConfig.packages.join(', ')} installed successfully.`,
    );

    // Check for existing config files and log warnings if found
    await checkExistingConfigFiles(packageConfig.configFiles);
    logger.debug(
      `Checked for existing config files: ${JSON.stringify(
        packageConfig.configFiles,
      )}`,
    );

    // Copy the config files to the specified output path
    await handlePackageCopy(path.resolve(projectDir), cmd);
    logger.success(`Installation process for ${cmd} completed.`);
  } catch (error) {
    const errorMessage = error.message
      ? error.message
      : 'Failed to install package.';
    throw new AddPackageError('handleAddPackageCommand', [cmd], errorMessage);
  }
}

module.exports = {
  handleAddPackageCommand: withErrorHandling(
    handleAddPackageCommand,
    AddPackageError,
  ),
};
