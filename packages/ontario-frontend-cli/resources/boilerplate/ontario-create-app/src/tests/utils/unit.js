/**
 * All the utility functions for the unit tests
 */

const chai = require('chai');
const fs = require('fs');
const assert = chai.assert;
const existsSync = fs.existsSync;

/**
 * Helper function to check file existence
 * @param {string} filePath - The path of the file to check.
 * @param {string} description - The description of the file.
 * @param {string} customErrorMessage - Optional custom error message.
 *
 * @returns {boolean} TRUE/FALSE value based on if the file was found or
 */
function checkFileExists(filePath, description, customErrorMessage) {
  it(description, function () {
    assert(
      existsSync(filePath),
      `File does not exist: ${filePath} \n ${customErrorMessage}`,
    );
  });
}

module.exports = {
  checkFileExists,
};