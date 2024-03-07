const fs = require('fs');
const path = require('path');
const { ROOT_DIR } = require('../../config');

/**
 * Synchronously reads the package.json file at the project root and parses its JSON content.
 * @returns {Object} The parsed package.json content as an object.
 */
function readPackageJson() {
  const packageJsonPath = path.join(ROOT_DIR, 'package.json');
  try {
    // Use readFileSync for synchronous file reading
    const data = fs.readFileSync(packageJsonPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Failed to read package.json: ${error.message}`);
  }
}

module.exports = { readPackageJson };
