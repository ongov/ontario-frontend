const path = require('path');
const fs = require('fs');
const { installPackages } = require('../../core/operations');
const logger = require('../../core/utils/logger');
const { handlePackageCopy } = require('../../core/utils/process/copyPackage');

async function handleAddOntarioPackageCommand(cmd = {}) {

  if (!fs.existsSync("package.json"))
    throw new Error("package.json file not found.");

  fs.readFile("package.json", async function (err, data) {
    if (err)
      throw err;
    if (!data.includes('@ongov/ontario-frontend'))
      throw new Error('Ontario Frontend package not found within package.json as a dependency');

    try {
      switch (cmd) {
        case 'eslint':
          logger.info('eslint selected');
          await installPackages(['eslint', 'eslint-plugin-import', '@ongov/eslint-config-ontario-frontend'], true);
          if (fs.existsSync(".eslintrc.js"))
            throw new Error('A configuration file for ESLint already exists.');
          await handlePackageCopy(path.resolve(process.cwd()), 'eslint-config/.eslintrc.js', '.eslintrc.js');
          break;
        case 'prettier':
          logger.info('prettier selected');
          break;
        default:
          logger.error('Invalid package option');
      }
    } catch (error) {
      const errorMessage = error.message ? error.message : 'Failed to install package.';
      logger.error(errorMessage, error);
    }
  });

  // verify if there is a package.json in the directory
    // has @ongov/ontario-frontend as dependency
  
}

module.exports = { handleAddOntarioPackageCommand };