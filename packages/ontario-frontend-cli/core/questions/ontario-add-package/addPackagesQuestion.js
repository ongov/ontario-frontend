const { PACKAGES_CONFIG } = require('../../config');
const { question } = require('../../utils/styling/textStyling');

let packageChoices = Object.entries(PACKAGES_CONFIG).map((o) => o.map((i) => Object.entries(i).find(([key, value]) => key === "installName")).flat().pop());



const addPackagesQuestion = (cmd) => {
  return {
    type: 'checkbox',
    name: 'addPackages',
    message: 'Select packages to add:',
    choices: packageChoices
  }
};

module.exports = addPackagesQuestion;
