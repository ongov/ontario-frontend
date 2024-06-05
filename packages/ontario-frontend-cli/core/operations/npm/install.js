const { spawn } = require('child_process');
const logger = require('../../utils/logger');

/**
 * Install a list of packages using npm.
 * 
 * @param {Array<String>} packageNames - An array of the packages you wish to install.
 * @param {boolean} devFlag - Whether or not you want the installed packages to be devDependencies.
 * @param {Object} cwd (current working directory) - TODO - better describe this.
 * 
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
      if (code === 0) resolve();
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
function installAllPackages(projectPath) {
  logger.info('Installing NPM dependencies...');
  return new Promise((resolve, reject) => {
    const npmInstall = spawn('npm', ['install'], {
      stdio: 'inherit',
      cwd: projectPath,
    });

    npmInstall.on('close', (code) => {
      if (code === 0) {
        logger.success('NPM dependencies installed successfully.');
        resolve();
      } else {
        reject(new Error(`npm install failed with code ${code}`));
      }
    });
  });
}

module.exports = { installPackages, installAllPackages };
