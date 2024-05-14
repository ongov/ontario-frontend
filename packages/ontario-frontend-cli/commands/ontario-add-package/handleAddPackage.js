const path = require('path');
const fs = require('fs');
const { installPackages } = require('../../core/operations');
const logger = require('../../core/utils/logger');
const { handlePackageCopy } = require('../../core/utils/process/copyPackage');

// TODO: need a --local flag check
// 

async function handleAddOntarioPackageCommand(cmd = {}) {

  // TODO: Can we move this validation to bin/ontario-add-package
  // TODO: It might be worth creating a core/utils/validation function that can be
  // reused as this will likely be needed by remove package, and potentially other management cmds later
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
            // TODO: I don't think this should be an error and that we should try handling it a bit more gracefully
            // We could instead put handlePackageCopy line in an "else" and the "if" could be an info log that
            // tells them how to use our eslint config that ws just installed
            // i.e. tell them to add this to their .eslint.js: "extends: '@ongov/eslint-config-ontario-frontend',"
            throw new Error('A configuration file for ESLint already exists.');
          await handlePackageCopy(path.resolve(process.cwd()), 'eslint-config/.eslintrc.js', '.eslintrc.js');
          break;
        case 'prettier':
          logger.info('prettier selected');
          // TODO: I moved the boilerplate for prettier, it was still in the old spot
          // It is now in resources/boilerplate/shared just like the eslint-config
          break;
        default:
          // TODO: list package options as well
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