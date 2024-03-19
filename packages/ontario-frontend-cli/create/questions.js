/* eslint-disable no-console */
const colours = require('../utils/chalkColours');
const figlet = require('figlet');
const { validFileName } = require('../utils/validate-questions');

// Print a header for the application in the terminal
console.log(
  colours.banner(
    figlet.textSync('Ontario.ca\nFrontend', { horizontalLayout: 'full' }),
  ),
);

// Define the questions for the inquirer prompt
const createQuestions = [
  { // If a prompt exceeds 1 line and wraps it can cause the input cursor to be misaligned. Move input under question, instead of inline.
    type: 'input',
    name: 'projectName',
    message:
      'What is your project named?\n',
    default: 'my-frontend-project',
    validate: (value) => validFileName(value),
  },
  {
    type: 'input',
    name: 'enRoot',
    message:
      'What is the file name for the English-language page? (This will be used for the path, e.g. ontario.ca/my-english-page):\n',
    validate: (value) => validFileName(value),
  },
  {
    type: 'input',
    name: 'frRoot',
    message:
      'What is the file name for the French-language page? (This will be used for the path, e.g. ontario.ca/ma-page-francaise):\n',
    validate: (value) => validFileName(value),
  },
  {
    type: 'list',
    name: 'esLint',
    message: 'Add and configure ESLint for finding and fixing code problems?',
    choices: ['Yes', 'No'],
    default: 'No',
    filter: function(value) {
      return value === 'Yes' ? true : false;
    }
  },
  {
    type: 'list',
    name: 'prettier',
    message: 'Add and configure Prettier for opinionated code formatting?',
    choices: ['Yes', 'No'],
    default: 'No',
    filter: function(value) {
      return value === 'Yes' ? true : false;
    }
  }
];

// Add color to the questions
createQuestions.forEach((question) => {
  question.message = colours.question(question.message);
});

// Export the 'createQuestions' array
module.exports = createQuestions;
