const logger = require('../utils/logger');
const { readPackageJson } = require('../utils/project/readPackageJson');

/**
 * Checks if a package.json file exists in the given directory.
 * 
 * @param {string} dir - The directory to check for package.json.
 * 
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the package.json file exists, false otherwise.
 */
async function doesPackageJsonExist(dir = process.cwd()) {
    try {
      await fs.access(path.join(dir, 'package.json'));
      return true;
    } catch (err) {
      logger.error(`Error checking for package.json in ${dir}: ${err.message}`);
      return false;
    }
  }

/**
 * Checks if the package.json file contains reference to @ongov/ontario-frontend.
 * 
 * @param {string} dir - The directory to check for package.json.
 * 
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if reference to @ongov/ontario-frontend is found within the package.json file, false otherwise.
 */
async function isOntarioFrontendProject(dir = process.cwd()) {
    try {
      const packageJson = await readPackageJson(dir);
      if (
        !packageJson.dependencies || 
        !packageJson.dependencies['@ongov/ontario-frontend']
      ) {
        logger.error('No \'@ongov/ontario-frontend\' dependency found inside of package.json. Ensure you are performing this command within an Ontario.ca Frontend project');
        return false;
      }
      return true;
    } catch (err) {
      logger.error('No package.json found in the targetted directory. Ensure you are performing this command within your Ontario.ca Frontend project');
      return false;
    }
  }

module.exports = { doesPackageJsonExist, isOntarioFrontendProject };
