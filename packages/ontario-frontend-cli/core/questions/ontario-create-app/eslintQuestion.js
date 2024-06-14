const { question } = require('../../utils/styling/textStyling');

/**
 * Generates a question object for ESLint configuration.
 *
 * @param {boolean} askESLint - Whether to ask for ESLint configuration.
 * @returns {Object} A question object to be used with inquirer.prompt.
 */
const eslintQuestion = (askESLint) => ({
  type: 'list',
  name: 'addESLint',
  message: question('Would you like to add ESLint for fixing code problems?'),
  choices: [
    { name: 'Yes', value: true },
    { name: 'No', value: false },
  ],
  default: 1, // Default to "No"
  when: askESLint,
});

module.exports = eslintQuestion;
