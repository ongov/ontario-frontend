// Import the required modules
const chalk = require('chalk');
const figlet = require('figlet');
const { validFileName, validPath } = require('../utils/validate-questions');

// Print a header for the application in the terminal
console.log(
  chalk.yellow(
    figlet.textSync('Ontario.ca Toolkit', { horizontalLayout: 'full' })
  )
);

// Define the questions for the inquirer prompt
const createQuestions = [
  {
    type: "input",
    name: "projectName",
    message:
      "Specify your project name for the package.json file (lowercase, hyphens, and underscores only):",
    default: "my-jamstack-project",
    validate: (value) => validFileName(value),
  },
  {
    type: "input",
    name: "projectDescription",
    message: "Specify a short description for your project:",
    default: "New Ontario.ca Jamstack Toolkit project",
  },
  {
    type: "input",
    name: "destination",
    message:
      "Specify an alternative location to create your project (or press enter to use the current directory):",
    default: process.cwd(),
    validate: (value) => validPath(value),
  },
  {
    type: "input",
    name: "enRoot",
    message: "What is the file name of the English-language page? (this will also be used for the path: ex. ontario.ca/my-english-page)",
    validate: (value) => validFileName(value),
  },
  {
    type: "input",
    name: "frRoot",
    message: "What is the file name of the French-language page? (this will also be used for the path: ex. ontario.ca/ma-page-francaise)",
    validate: (value) => validFileName(value),
  }
];

// Add color to the questions
createQuestions.forEach((question) => {
  question.message = chalk.cyan(question.message);
});

// Export the 'createQuestions' array
module.exports = createQuestions;