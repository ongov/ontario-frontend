/* eslint-disable no-console */
const colours = require('../utils/chalkColours');
const figlet = require('figlet');
const { validFileName } = require('../utils/validate-questions');

// Print a header for the application in the terminal
console.log(
  colours.banner(
    figlet.textSync('Ontario\nFrontend', { horizontalLayout: 'full' }),
  ),
);

// Define the questions for the inquirer prompt
const createQuestions = [
  { // If a prompt exceeds 1 line and wraps it can cause the input cursor to be misaligned. Move input under question, instead of inline.
    type: 'input',
    name: 'projectName',
    message:
      'Specify your project name for the package.json file (lowercase, hyphens, and underscores only):\n',
    default: 'my-frontend-project',
    validate: (value) => validFileName(value),
  },
  {
    type: 'input',
    name: 'projectDescription',
    message: 'Specify a short description for your project:\n',
    default: 'New Ontario Frontend project',
  },
  {
    type: 'input',
    name: 'enRoot',
    message:
      'What is the file name of the English-language page? (this will also be used for the path: ex. ontario.ca/my-english-page)\n',
    validate: (value) => validFileName(value),
  },
  {
    type: 'input',
    name: 'frRoot',
    message:
      'What is the file name of the French-language page? (this will also be used for the path: ex. ontario.ca/ma-page-francaise)\n',
    validate: (value) => validFileName(value),
  },
  {
    type: 'list',
    name: 'ESLint',
    message: 'Want to add ESLint for fixing code problems?',
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
