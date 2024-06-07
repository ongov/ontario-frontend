const { question } = require('../utils/styling/textStyling');

/**
 * Generates a question object for Prettier configuration.
 *
 * @param {boolean} askPrettier - Whether to ask for Prettier configuration.
 * @returns {Object} A question object to be used with inquirer.prompt.
 */
const prettierQuestion = (askPrettier) => ({
  type: 'list',
  name: 'addPrettier',
  message: question('Would you like to add Prettier for formatting and styling code?'),
  choices: [
    { name: 'Yes', value: true },
    { name: 'No', value: false },
  ],
  default: 1, // Default to "No"
  when: askPrettier,
});

module.exports = prettierQuestion;
