const { withErrorHandling } = require('../utils/errorHandler');
const logger = require('../utils/logger');
const { readPackageJson } = require('../utils/project/readPackageJson');
const fs = require('fs').promises;
const path = require('path');

/**
 * Checks if a package.json file exists in the given directory.
 * 
 * @param {string} dir - The directory to check for package.json.
 * 
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the package.json file exists, false otherwise.
 */
const doesPackageJsonExist = withErrorHandling(async (dir = process.cwd()) => {
  await fs.access(path.join(dir, 'package.json'));
  return true;
});

/**
 * Checks if the package.json file contains reference to @ongov/ontario-frontend.
 * 
 * @param {string} dir - The directory to check for package.json.
 * 
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if reference to @ongov/ontario-frontend is found within the package.json file, false otherwise.
 */
const isOntarioFrontendProject = withErrorHandling(async (dir = process.cwd()) => {
  const packageJson = await readPackageJson(dir);
  if (!packageJson.dependencies || !packageJson.dependencies['@ongov/ontario-frontend']) {
    logger.error(
      "No '@ongov/ontario-frontend' dependency found inside of package.json. Ensure you are performing this command within an Ontario.ca Frontend project"
    );
    return false;
  }
  return true;
});

module.exports = { doesPackageJsonExist, isOntarioFrontendProject };
