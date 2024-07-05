const { PACKAGES_CONFIG } = require('../../config');

// Grab selection objects from PACKAGES_CONFIG top level keys
const packageChoices = Object.keys(PACKAGES_CONFIG);

const removePackagesQuestion = () => {
  return {
    type: 'checkbox',
    name: 'removePackages',
    message: 'Select packages to remove:',
    choices: packageChoices
  }
};

module.exports = removePackagesQuestion;
