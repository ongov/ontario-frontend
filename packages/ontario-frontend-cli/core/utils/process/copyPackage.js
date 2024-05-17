const path = require('path');

const logger = require('../logger');
const { SHARED_BOILERPLATE_DIR, PACKAGES_CONFIG } = require('../../config');
const { copy } = require('../../operations');

/**
 * Copy package configuration files from the 
 * resources/boilerplate/shared directory to one that is specified.
 *
 * @async
 * 
 * @param {string} outputPath - The path inside your project that you wish to execute the copy into.
 * @param {string} packageName - The name of the package you wish to copy config for (e.g. eslint, prettier).
 * 
 * @example
 * // In the current directory, copy the .eslintrc.js file from the shared directory.
 * await handlePackageCopy(path.resolve(process.cwd()), 'eslint');
 */ 
async function handlePackageCopy(outputPath, packageName) {
  const packageFiles = PACKAGES_CONFIG[packageName]?.configFiles; // Get our packageFiles from the config
  
  if ( !Array.isArray(packageFiles) ) {
    // This condition fails as expected BUT this error is not getting propogated
    throw new Error(`Package configuration for ${packageName} not found.`);
  }

  for (const file of packageFiles) {
    const fullPackagePath = path.join(SHARED_BOILERPLATE_DIR, file.source);
    const fullOutputPath = path.join(outputPath, file.destination);
    await copy(fullPackagePath, fullOutputPath);
    logger.success(`${fullPackagePath} copied successfully to ${fullOutputPath}.`);
  }
}

module.exports = { handlePackageCopy };