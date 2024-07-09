const fs = require('fs').promises;
const path = require('path');
const { readPackageJson } = require('./readPackageJson');
const logger = require('../logger');
const { CORE_DEPENDENCY } = require('../../config');

/**
 * Checks if a file exists at the given path.
 *
 * @param {string} filePath - The path to the file.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the file exists, false otherwise.
 */
async function doesFileExist(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a package.json file exists in the given directory.
 *
 * @param {string} dir - The directory to check for package.json.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the package.json file exists, false otherwise.
 */
async function doesPackageJsonExist(dir = process.cwd()) {
  return doesFileExist(path.join(dir, 'package.json'));
}

/**
 * Checks if the package.json file contains a specific dependency.
 *
 * @param {string} dir - The directory to check for package.json.
 * @param {string} packageName - The name of the package to check.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the package is found within the dependencies, false otherwise.
 */
async function isPackageInstalled(dir, packageName) {
  try {
    const packageJson = await readPackageJson(dir);
    return !!(
      packageJson.dependencies && packageJson.dependencies[packageName]
    ) || !!(packageJson.devDependencies && packageJson.devDependencies[packageName]);
  } catch (error) {
    logger.error(`Failed to read package.json: ${error.message}`);
    return false;
  }
}

/**
 * Checks if the package.json file contains the core dependency.
 *
 * @param {string} dir - The directory to check for package.json.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the core dependency is found within the dependencies, false otherwise.
 */
async function isOntarioFrontendProject(dir = process.cwd()) {
  return isPackageInstalled(dir, CORE_DEPENDENCY.name);
}

/**
 * Checks for the existence of configuration files.
 *
 * @param {Array} configFiles - List of configuration files to check.
 * @returns {Promise<boolean>} - Returns true if any configuration file exists, otherwise false.
 */
async function checkExistingConfigFiles(configFiles) {
  let anyConfigFileExists = false;
  // logger.info(configFiles);
  for (const { destination, warningMessage } of configFiles) {
    logger.info(destination);
    logger.info( warningMessage);
    try {
      logger.info(process.cwd());
      await fs.readFile(destination);
      logger.success('NEXT STEP 4');
      anyConfigFileExists = true;
      logger.warning(
        warningMessage || `Configuration file ${destination} already exists.`,
      );
    } catch (err) {
      logger.error(err.message);
      // File does not exist, no action needed
    }
  }
  return anyConfigFileExists;
}

module.exports = {
  doesFileExist,
  doesPackageJsonExist,
  isPackageInstalled,
  isOntarioFrontendProject,
  checkExistingConfigFiles,
};
