const { question } = require('../../utils/styling/textStyling');

const confirmRemovalQuestion = ([...arr]) => {
  return {
    type: 'list',
    name: 'confirmRemoval',
    message: question(`Are you sure you want to remove ${arr.join(', ')} and ${arr.length > 1 ? 'their' : 'its'} associated packages and configuration files?`),
    choices: ['Yes', 'No'],
    default: 'No',
    filter: (value) => value === 'Yes'
  }
};

module.exports = confirmRemovalQuestion;
