const path = require('path');
const fs = require('fs');
const { installPackages } = require('../../core/operations');
const logger = require('../../core/utils/logger');
const { handlePackageCopy } = require('../../core/utils/process/copyPackage');

async function handleAddOntarioPackageCommand(cmd = {}) {
  try {
    switch (cmd) {
      case 'eslint':
        logger.info('eslint selected');

        await installPackages(['eslint', 'eslint-plugin-import', '@ongov/eslint-config-ontario-frontend'], true);

        if (fs.existsSync(".eslintrc.js"))
          logger.warning(".eslint.js file already present. Please add \"extends: '@ongov/eslint-config-ontario-frontend\" to your existing file.");

        await handlePackageCopy(path.resolve(process.cwd()), 'eslint');
        break;
      case 'prettier':
        logger.info('prettier selected');
        // TODO: I moved the boilerplate for prettier, it was still in the old spot
        // It is now in resources/boilerplate/shared just like the eslint-config
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