const { question } = require('../../utils/styling/textStyling');

const eslintQuestion = {
  type: 'list',
  name: 'addESLint',
  message: question('Add ESLint for fixing code problems?'),
  choices: ['Yes', 'No'],
  default: 'No',
  filter: (value) => value === 'Yes',
};

module.exports = eslintQuestion;
