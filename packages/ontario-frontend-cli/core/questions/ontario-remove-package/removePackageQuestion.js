const { question } = require('../../utils/styling/textStyling');

const removePackageQuestion = (cmd) => {
  return {
    type: 'list',
    name: 'removePackage',
    message: question(`Are you sure you want to remove ${cmd} and its associated packages and configuration files?`),
    choices: ['Yes', 'No'],
    default: 'No',
    filter: (value) => value === 'Yes'
  }
};

module.exports = removePackageQuestion;
