const { PACKAGES_CONFIG } = require('../../config');

// Grab selection objects from PACKAGES_CONFIG top level keys
const packageChoices = Object.keys(PACKAGES_CONFIG);

const addPackagesQuestion = (cmd) => {
  return {
    type: 'checkbox',
    name: 'addPackages',
    message: 'Select packages to add:',
    choices: packageChoices
  }
};

module.exports = addPackagesQuestion;
