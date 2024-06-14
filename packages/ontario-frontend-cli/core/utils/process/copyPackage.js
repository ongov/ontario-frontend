const path = require('path');
const logger = require('../logger');
const { SHARED_BOILERPLATE_DIR, PACKAGES_CONFIG } = require('../../config');
const { copyFiles } = require('../../operations/file/copy');
const { withErrorHandling } = require('../../errors/errorHandler');
const PackageCopyOperationError = require('../../errors/PackageCopyOperationError'); // Custom error class

/**
 * Copies package configuration files from the shared directory to the specified output path.
 *
 * @param {string} outputPath - The path inside your project where the files should be copied.
 * @param {string} packageName - The name of the package to copy config for (e.g., eslint, prettier).
 * @returns {Promise<void>} A promise that resolves when the files are copied successfully or rejects on failure.
 * @throws Will throw an error if the package configuration is not found or any copy operation fails.
 */
async function handlePackageCopy(outputPath, packageName) {
  const packageFiles = PACKAGES_CONFIG[packageName]?.configFiles;

  if (!Array.isArray(packageFiles)) {
    const errorMessage = `Package configuration for ${packageName} not found.`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const filesToCopy = packageFiles.map((file) => ({
    source: path.join(SHARED_BOILERPLATE_DIR, file.source),
    destination: path.join(outputPath, file.destination),
  }));

  await copyFiles(filesToCopy);
  logger.success(
    `All configuration files for ${packageName} copied successfully.`,
  );
}

module.exports = {
  handlePackageCopy: withErrorHandling(handlePackageCopy, PackageCopyOperationError),
};
