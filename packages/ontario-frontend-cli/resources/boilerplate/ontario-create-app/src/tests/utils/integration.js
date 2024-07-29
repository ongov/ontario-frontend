/**
 * All the utility functions for the integration tests
 */

const fs = require('fs');
const path = require('path');

/**
 * Reads the package.json file and returns its content as an object.
 * @returns {Object} The contents of the package.json file.
 */
const readPackageJson = function () {
  const packageJsonPath = path.resolve(__dirname, '../../..', 'package.json');
  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
};

/**
 * Checks if a package is installed by looking at the dependencies and devDependencies in the package.json file.
 * @param {string} pkg - The name of the package to check.
 * @returns {boolean} True if the package is installed, false otherwise.
 */
const isPackageInstalled = function (pkg) {
  const packageJson = readPackageJson();
    if (packageJson.dependencies && packageJson.dependencies.hasOwnProperty(pkg)) {
        console.log(`Package ${pkg} found in dependencies`);
        return true;
    }
    if (packageJson.devDependencies && packageJson.devDependencies.hasOwnProperty(pkg)) {
        console.log(`Package ${pkg} found in devDependencies`);
        return true;
    }
    return false;
};

module.exports = {
  readPackageJson,
  isPackageInstalled,
};
