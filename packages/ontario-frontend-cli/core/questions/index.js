const projectNameQuestion = require('./ontario-create-app/projectNameQuestion');
const languagePageQuestions = require('./ontario-create-app/languagePageQuestions');
const eslintQuestion = require('./ontario-create-app/eslintQuestion');
const prettierQuestion = require('./ontario-create-app/prettierQuestion');

const removePackageQuestion = require('./ontario-remove-package/removePackageQuestion');

/**
 * Generates the list of questions to be asked during the project creation process.
 *
 * @param {Object} askQuestions - An object that determines which questions to ask.
 * @param {boolean} askQuestions.askProjectName - Whether to ask for the project name.
 * @param {boolean} askQuestions.askEnPage - Whether to ask for the English page name.
 * @param {boolean} askQuestions.askFrPage - Whether to ask for the French page name.
 * @param {boolean} askQuestions.askESLint - Whether to ask for ESLint configuration.
 * @param {boolean} askQuestions.askPrettier - Whether to ask for Prettier configuration.
 * @returns {Array<Object>} An array of question objects to be used with inquirer.prompt.
 *
 * The function conditionally includes questions based on the provided `askQuestions` object.
 * Each question is imported from a separate module to keep the code modular and maintainable.
 */
const createOntarioAppQuestions = (askQuestions) => [
  projectNameQuestion(askQuestions.askProjectName),
  ...languagePageQuestions(askQuestions.askEnPage, askQuestions.askFrPage),
  eslintQuestion(askQuestions.askESLint),
  prettierQuestion(askQuestions.askPrettier),
];

/**
 * Generates the list of questions to be asked during the package removal process.
 * 
 * @param {String|Object} cmd - The input value from the user when running the 
 * ontario-remove-package command. e.g. "eslint" or "prettier".
 */
const ontarioRemovePackageQuestions = (cmd) => [
  removePackageQuestion(cmd),
];

module.exports = {
  createOntarioAppQuestions,
  ontarioRemovePackageQuestions 
};
