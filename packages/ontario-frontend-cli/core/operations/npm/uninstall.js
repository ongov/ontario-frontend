const logger = require('../../utils/logger');
const spawnAsync = require('../../utils/spawnAsync');

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

  try {
    await spawnAsync(command, args, { cwd });
    packageNames.forEach((packageName) =>
      logger.success(`${packageName} successfully uninstalled.`),
    );
  } catch (error) {
    logger.error(
      `npm uninstall for ${packageNames.join(', ')} failed with error: ${
        error.message
      }`,
    );
    throw new Error(`npm uninstall for ${packageNames.join(', ')} failed`);
  }
}

module.exports = { uninstallPackages };
