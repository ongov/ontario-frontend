const logger = require('../../utils/logger');
const spawnAsync = require('../../utils/process/spawnAsync');

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

  try {
    await spawnAsync(command, args, { cwd });
    packageNames.forEach((packageName) =>
      logger.success(`${packageName} successfully installed.`),
    );
  } catch (error) {
    logger.error(
      `npm install for ${packageNames.join(', ')} failed with error: ${
        error.message
      }`,
    );
    throw new Error(`npm install for ${packageNames.join(', ')} failed`);
  }
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
