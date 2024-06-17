const path = require('path');
const fs = require('fs');
const { PACKAGES_CONFIG } = require('../../core/config');
const { installPackages } = require('../../core/operations');
const logger = require('../../core/utils/logger');
const { handlePackageCopy } = require('../../core/utils/process/copyPackage');

/**
 * Add Ontario packages to the project.
 *
 * @param {String|Object} cmd - The input value from the user when running the 
 * ontario-remove-package command. e.g. "eslint" or "prettier".
 */
async function handleAddPackageCommand(cmd = {}) {
  const packageConfig = PACKAGES_CONFIG[cmd];

  if (!packageConfig) {
    const availablePackages = Object.keys(PACKAGES_CONFIG).join(', ');
    logger.error(`Invalid package option selected. Please select a valid package. Available packages are: ${availablePackages}`);
    return;
  }

  try {
    logger.info(`Installation process for ${cmd} started.`);
    await installPackages(packageConfig.packages, true);

    packageConfig.configFiles.forEach(({ destination, warningMessage }) => {
      if (fs.existsSync(destination)) {
        logger.warning(warningMessage);
      }
    });

    await handlePackageCopy(path.resolve(process.cwd()), cmd);
    logger.info(`Installation process for ${cmd} completed.`);
  } catch (error) {
    const errorMessage = error.message ? error.message : `Failed to install package: ${cmd}.`;
    logger.error(errorMessage, error);
  }
}

module.exports = { handleAddPackageCommand };