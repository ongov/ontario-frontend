const projectNameQuestion = require('./projectNameQuestion');
const languagePageQuestions = require('./languagePageQuestions');
const eslintQuestion = require('./eslintQuestion');
const prettierQuestion = require('./prettierQuestion');

/**
 * Generates the list of questions to be asked during the project creation process.
 *
 * @param {Object} askQuestions - An object that determines which questions to ask.
 * @param {boolean} askQuestions.askProjectName - Whether to ask for the project name.
 * @param {boolean} askQuestions.askEnPage - Whether to ask for the English page name.
 * @param {boolean} askQuestions.askFrPage - Whether to ask for the French page name.
 * @returns {Array<Object>} An array of question objects to be used with inquirer.prompt.
 *
 * The function conditionally includes questions based on the provided `askQuestions` object.
 * Each question is imported from a separate module to keep the code modular and maintainable.
 */
const createOntarioAppQuestions = (askQuestions) => [
  projectNameQuestion(askQuestions.askProjectName),
  ...languagePageQuestions(askQuestions.askEnPage, askQuestions.askFrPage),
  eslintQuestion,
  prettierQuestion,
];

module.exports = {
  createOntarioAppQuestions,
};
