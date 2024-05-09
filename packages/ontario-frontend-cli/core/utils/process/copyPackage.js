const path = require('path');

const logger = require('../logger');
const { SHARED_BOILERPLATE_DIR } = require('../../config');
const { copy } = require('../../operations');

/**
 * Copy package configuration files from the 
 * resources/boilerplate/shared directory to one that is specified.
 *
 * @async
 * 
 * @param {string} outputPath - The path inside your project that you wish to execute the copy into.
 * @param {string} packagePath - The path inside the shared directory to the file that you wish to copy.
 * @param {string} outputFile - The name of the file after it has been copied.
 * 
 * @example
 * // In the current directory, copy the .eslintrc.js file from the shared directory.
 * await handlePackageCopy(path.resolve(process.cwd()), 'eslint-config/.eslintrc.js', '.eslintrc.js');
 */ 
async function handlePackageCopy(outputPath, packagePath, outputFile) {
    const fullPackagePath = path.join(SHARED_BOILERPLATE_DIR, packagePath);
    const fullOutputPath = path.join(outputPath, outputFile);
    copy(fullPackagePath, fullOutputPath);
    logger.success(`${fullPackagePath} package copied successfully.`);
}

module.exports = { handlePackageCopy };