const path = require('path');
const fs = require('fs');
const { PACKAGES_CONFIG } = require('../../core/config');
const { installPackages } = require('../../core/operations');
const logger = require('../../core/utils/logger');
const { handlePackageCopy } = require('../../core/utils/process/copyPackage');

async function handleAddOntarioPackageCommand(cmd = {}) {
  try {
    switch (cmd) {
      case 'eslint':
        logger.info('eslint selected');

        await installPackages(PACKAGES_CONFIG[cmd]?.packages, true);

        if (fs.existsSync(".eslintrc.js"))
          logger.warning(".eslint.js file already present. Please add \"extends\": \"@ongov/eslint-config-ontario-frontend\" to your existing file.");

        await handlePackageCopy(path.resolve(process.cwd()), cmd);
        break;
      case 'prettier':
        logger.info('prettier selected');

        await installPackages(PACKAGES_CONFIG[cmd]?.packages, true);

        if (fs.existsSync(".prettierrc.js"))
          logger.warning(".prettierrc.js file already present. Please add \"...@ongov/prettier-config-ontario-frontend\" to your existing file.");

        if (fs.existsSync(".prettierignore"))
          logger.warning(".prettierignore file already present. Please ignore the following directories and files: node_modules/, dist/, src/assets/vendor/* and *.njk");

        await handlePackageCopy(path.resolve(process.cwd()), cmd);
        break;
      default:
        logger.error('Invalid package option selected. Please select either "eslint" or "prettier".');
    }
  } catch (error) {
    const errorMessage = error.message ? error.message : 'Failed to install package.';
    logger.error(errorMessage, error);
  }
}

module.exports = { handleAddOntarioPackageCommand };