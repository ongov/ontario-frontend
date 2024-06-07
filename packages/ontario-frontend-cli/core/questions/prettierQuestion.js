const { question } = require('../utils/styling/textStyling');

const prettierQuestion = (askPrettier) => ({
  type: 'list',
  name: 'addPrettier',
  message: question('Add Prettier for formatting and styling code?'),
  choices: ['Yes', 'No'],
  default: 'No',
  filter: (value) => value === 'Yes',
  when: askPrettier,
});

module.exports = prettierQuestion;
