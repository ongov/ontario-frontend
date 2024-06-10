const path = require('path');
const logger = require('../logger');
const { PACKAGES_CONFIG } = require('../../config');
const { removeFiles } = require('../../operations/file/remove');

/**
 * Removes package configuration files from the targetted path.
 *
 * @async
 * @param {string} filePath - The path inside your project where the files should be removed from.
 * @param {string} packageName - The name of the package you wish to remove config for (e.g., eslint, prettier).
 * @throws Will throw an error if the package configuration is not found or any remove operation fails.
 */
async function handleRemovePackage(filePath, packageName) {
  try {
    const packageFiles = PACKAGES_CONFIG[packageName]?.configFiles;

    if (!Array.isArray(packageFiles)) {
      throw new Error(`Package configuration for ${packageName} not found.`);
    }

    const filesToRemove = packageFiles.map((file) => ({
      location: path.join(filePath, file.destination),
    }));

    await removeFiles(filesToRemove);
    logger.success(
      `All configuration files for ${packageName} removed successfully.`,
    );
  } catch (error) {
    logger.error(
      `Failed to remove configuration for ${packageName}: ${error.message}`,
    );
    throw error; // Propagate the error to be handled by the calling function
  }
}

module.exports = { handleRemovePackage };
