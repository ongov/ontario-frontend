const fs = require('fs').promises;
const path = require('path');
const { withErrorHandling } = require('../../errors/errorHandler');
const ReadPackageJsonError = require('../../errors/ReadPackageJsonError'); // Import the custom error class

/**
 * Asynchronously reads the package.json file from the specified directory and parses its JSON content.
 *
 * @param {string} dir - The directory to read the package.json from.
 * @returns {Promise<Object>} A promise that resolves to the parsed package.json content as an object.
 * @throws {ReadPackageJsonError} Throws an error if the file cannot be read or parsed.
 */
async function readPackageJson(dir = process.cwd()) {
  const packageJsonPath = path.join(dir, 'package.json');
  const data = await fs.readFile(packageJsonPath, 'utf8');
  return JSON.parse(data);
}

module.exports = {
  readPackageJson: withErrorHandling(readPackageJson, ReadPackageJsonError),
};
