const { spawn } = require('child_process');
const logger = require('../../utils/logger');

/**
 * Uninstall a list of packages using npm.
 * 
 * @param {Array<String>} packageNames - An array of the packages you wish to uninstall.
 * @param {boolean} devFlag - Whether or not the packages to be uninstalled are devDependencies.
 * @param {Object} cwd (current working directory) - TODO - better describe this.
 * 
 * @returns {Promise<void>} A promise that resolves when the uninstallation is complete or rejects on failure.
 * 
 * @example
 * // Uninstall 2 packages relating to eslint which are devDependencies.
 * await uninstallPackages(['eslint', '@ongov/eslint-config-ontario-frontend'], true);
 */ 
function uninstallPackages(packageNames, devFlag = false, { cwd = '' } = {}) {
  return new Promise((resolve, reject) => {
    const process = spawn('npm', ['uninstall', devFlag ? '--save-dev' : '', ...packageNames], {
      stdio: 'inherit',
      cwd,
    });
    process.on('close', (code) => {
      if (code === 0) {
        packageNames.forEach((packageName) => logger.success(`${packageName} successfully uninstalled.`));
        resolve();
      }
      else
        reject(
          new Error(`npm uninstall for ${packageNames} failed with code ${code}`),
        );
    });
  });
}

module.exports = { uninstallPackages };
