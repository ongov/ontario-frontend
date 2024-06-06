const path = require('path');
const logger = require('../logger');
const { SHARED_BOILERPLATE_DIR, PACKAGES_CONFIG } = require('../../config');
const { copyFiles } = require('../operations/copy');

/**
 * Copies package configuration files from the shared directory to the specified output path.
 *
 * @async
 * @param {string} outputPath - The path inside your project where the files should be copied.
 * @param {string} packageName - The name of the package you wish to copy config for (e.g., eslint, prettier).
 * @throws Will throw an error if the package configuration is not found or any copy operation fails.
 */
async function handlePackageCopy(outputPath, packageName) {
  try {
    const packageFiles = PACKAGES_CONFIG[packageName]?.configFiles;

    if (!Array.isArray(packageFiles)) {
      throw new Error(`Package configuration for ${packageName} not found.`);
    }

    const filesToCopy = packageFiles.map((file) => ({
      source: path.join(SHARED_BOILERPLATE_DIR, file.source),
      destination: path.join(outputPath, file.destination),
    }));

    copyFiles(filesToCopy);
    logger.success(
      `All configuration files for ${packageName} copied successfully.`,
    );
  } catch (error) {
    logger.error(
      `Failed to copy configuration for ${packageName}: ${error.message}`,
    );
    throw error; // Propagate the error to be handled by the calling function
  }
}

module.exports = { handlePackageCopy };
