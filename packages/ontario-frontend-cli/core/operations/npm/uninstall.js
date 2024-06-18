const PackageUninstallationError = require('../../errors/PackageUninstallationError');
const { withErrorHandling } = require('../../errors/errorHandler');
const logger = require('../../utils/logger');
const { spawnAsync } = require('../../utils/process/spawnAsync');

/**
 * Uninstall a list of packages using npm.
 *
 * @param {string[]} packageNames - An array of the packages you wish to uninstall.
 * @param {boolean} [devFlag=false] - Whether or not the packages to be uninstalled are devDependencies.
 * @param {Object} [options={}] - Options for the uninstallation.
 * @param {string} [options.cwd=''] - The current working directory for the uninstallation.
 * @returns {Promise<void>} A promise that resolves when the uninstallation is complete or rejects on failure.
 *
 * @example
 * // Uninstall 2 packages relating to eslint which are devDependencies.
 * await uninstallPackages(['eslint', '@ongov/eslint-config-ontario-frontend'], true);
 */
async function uninstallPackages(
  packageNames,
  devFlag = false,
  { cwd = '' } = {},
) {
  if (!Array.isArray(packageNames) || packageNames.length === 0) {
    throw new PackageUninstallationError(
      'uninstallPackages',
      packageNames,
      'No packages specified for uninstallation'
    );
  }

  const command = 'npm';
  const args = [
    'uninstall',
    devFlag ? '--save-dev' : '',
    ...packageNames,
  ].filter(Boolean); // filter to remove empty strings

  logger.debug(
    `Uninstalling packages: ${packageNames.join(
      ', ',
    )} with devFlag=${devFlag} in directory=${cwd}`,
  );

  await spawnAsync(command, args, { cwd });
  packageNames.forEach((packageName) => logger.success(`${packageName} successfully uninstalled.`));
}

// Export the uninstallPackages function wrapped with withErrorHandling to ensure consistent error logging and handling across the application.
module.exports = {
  uninstallPackages: withErrorHandling(
    uninstallPackages,
    PackageUninstallationError,
  ),
};
