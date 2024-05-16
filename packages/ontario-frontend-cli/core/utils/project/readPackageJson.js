const fs = require('fs').promises;
const path = require('path');

/**
 * Asynchronously reads the package.json file from the specified directory and parses its JSON content.
 * 
 * @param {string} dir - The directory to read the package.json from.
 * 
 * @returns {Promise<Object>} A promise that resolves to the parsed package.json content as an object.
 * 
 * @throws {Error} Throws an error if the file cannot be read or parsed.
 */
async function readPackageJson(dir) {
  const packageJsonPath = path.join(dir, 'package.json');
  try {
    const data = await fs.readFile(packageJsonPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Failed to read package.json from ${dir}: ${error.message}`);
  }
}

module.exports = { readPackageJson };
