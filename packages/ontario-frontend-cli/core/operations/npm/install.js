const logger = require('../../utils/logger');
const spawnAsync = require('../../utils/process/spawnAsync');

/**
 * Installs a list of packages using npm.
 *
 * @param {Array<string>} packageNames - An array of the packages to install.
 * @param {boolean} devFlag - Whether or not the installed packages should be devDependencies.
 * @param {Object} options - Options for the npm command, including the current working directory (cwd).
 * @returns {Promise<void>} A promise that resolves when the installation is complete or rejects on failure.
 * 
 * @example
 * // Install 2 packages relating to eslint as devDependencies.
 * await installPackages(['eslint', '@ongov/eslint-config-ontario-frontend'], true);
 */ 
function installPackages(packageNames, devFlag = false, { cwd = '' } = {}) {
  return new Promise((resolve, reject) => {
    const process = spawn('npm', ['install', devFlag ? '--save-dev' : '', ...packageNames], {
      stdio: 'inherit',
      cwd,
    });
    process.on('close', (code) => {
      if (code === 0) {
        packageNames.forEach((packageName) => logger.success(`${packageName} successfully installed.`));
        resolve();
      }
      else
        reject(
          new Error(`npm install for ${packageNames} failed with code ${code}`),
        );
    });
  });
}

/**
 * Runs `npm install` in the specified directory to install all dependencies listed in package.json.
 *
 * @param {string} projectPath - The path to the project directory where package.json is located.
 * @returns {Promise<void>} A promise that resolves when the installation is complete or rejects on failure.
 */
async function installAllPackages(projectPath) {
  logger.info('Installing all NPM dependencies...');
  await spawnAsync('npm', ['install'], { cwd: projectPath });
  logger.success('NPM dependencies installed successfully.');
}

module.exports = { installPackages, installAllPackages };
