const path = require('path');
const logger = require('../logger');
const { PACKAGES_CONFIG } = require('../../config');
const { removeFiles } = require('../../operations/file/remove');
const { withErrorHandling } = require('../../errors/errorHandler');
const PackageUninstallationError = require('../../errors/PackageUninstallationError');

/**
 * Removes package configuration files from the targetted path.
 *
 * @async
 * @param {string} filePath - The path inside your project where the files should be removed from.
 * @param {string} packageName - The name of the package you wish to remove config for (e.g., eslint, prettier).
 * @throws {PackageUninstallationError} Will throw an error if the package configuration is not found or any remove operation fails.
 * @returns {Promise<void>}
 */
async function handlePackageFilesRemoval(filePath, packageName) {
  const packageFiles = PACKAGES_CONFIG[packageName]?.configFiles;

  if (!Array.isArray(packageFiles)) {
    const errorMessage = `Package configuration for ${packageName} not found.`;
    logger.error(errorMessage);
    throw new PackageUninstallationError('handlePackageFilesRemoval', [filePath, packageName], errorMessage);
  }

  const filesToRemove = packageFiles.map((file) => ({
    location: path.join(filePath, file.destination),
  }));

  await removeFiles(filesToRemove);
  logger.success(
    `All configuration files for ${packageName} removed successfully.`,
  );
}

module.exports = {
  handlePackageFilesRemoval: withErrorHandling(
    handlePackageFilesRemoval,
    PackageUninstallationError,
  ),
};
