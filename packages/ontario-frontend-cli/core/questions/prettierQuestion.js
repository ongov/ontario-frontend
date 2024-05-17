const { question } = require('../utils/styling/textStyling');

const prettierQuestion = {
  type: 'list',
  name: 'addPrettier',
  message: question('Add Prettier for formatting and styling code?'),
  choices: ['Yes', 'No'],
  default: 'No',
  filter: (value) => value === 'Yes',
};

module.exports = prettierQuestion;
