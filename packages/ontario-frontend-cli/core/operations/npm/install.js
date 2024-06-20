const { LOCAL_CORE_DEPENDENCY_DIR } = require('../../config');
const { withErrorHandling } = require('../../errors/errorHandler');
const PackageInstallationError = require('../../errors/PackageInstallationError');
const { spawnAsync } = require('../../utils');
const logger = require('../../utils/logger');

/**
 * Installs the given packages using npm.
 *
 * @param {string[]} packageNames - The names of the packages to install.
 * @param {boolean} [devFlag=false] - Whether to install the packages as dev dependencies.
 * @param {Object} [options={}] - Options for the installation.
 * @param {string} [options.cwd=''] - The current working directory for the installation.
 * @returns {Promise<void>} - A promise that resolves when the installation is complete.
 */
async function installPackages(
  packageNames,
  devFlag = false,
  { cwd = '' } = {},
) {
  const command = 'npm';
  const args = ['install', devFlag ? '--save-dev' : '', ...packageNames].filter(
    Boolean,
  ); // filter to remove empty strings

  logger.debug(
    `Installing packages: ${packageNames.join(
      ', ',
    )} with devFlag=${devFlag} in directory=${cwd}`,
  );

  await spawnAsync(command, args, { cwd });
  packageNames.forEach((packageName) =>
    logger.success(`${packageName} successfully installed.`),
  );
}

/**
 * Runs `npm install` in the specified directory to install all dependencies listed in package.json.
 *
 * @param {string} projectPath - The path to the project directory where package.json is located.
 * @returns {Promise<void>} A promise that resolves when the installation is complete or rejects on failure.
 */
async function installAllPackages(projectPath) {
  logger.debug(`Spawning npm install with cwd:${projectPath}`);
  await spawnAsync('npm', ['install'], { cwd: projectPath });
}

/**
 * Runs `npm link` for local packages.
 *
 * @param {String} pkg - The name of the package to link.
 */
async function linkLocalPackages(pkg, { cwd = '' } = {}) {
  const command = 'npm';

  for (pkgName of pkg) {
    const args = ['link', pkg];
    await spawnAsync(command, args, { cwd });
    logger.success(`${pkgName} successfully linked locally.`);
  }
}

// Export the functions wrapped with error handling to ensure consistent error logging and handling across the application.
module.exports = {
  installPackages: withErrorHandling(installPackages, PackageInstallationError),
  installAllPackages: withErrorHandling(
    installAllPackages,
    PackageInstallationError,
  ),
  linkLocalPackages: withErrorHandling(
    linkLocalPackages,
    PackageInstallationError,
  ),
};
