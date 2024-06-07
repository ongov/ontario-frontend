const { question } = require('../utils/styling/textStyling');

const eslintQuestion = (askESLint) => ({
  type: 'list',
  name: 'addESLint',
  message: question('Add ESLint for fixing code problems?'),
  choices: ['Yes', 'No'],
  default: 'No',
  filter: (value) => value === 'Yes',
  when: askESLint,
});

module.exports = eslintQuestion;
