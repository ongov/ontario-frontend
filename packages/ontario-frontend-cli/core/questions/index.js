const projectNameQuestion = require('./projectNameQuestion');
const languagePageQuestions = require('./languagePageQuestions');
const eslintQuestion = require('./eslintQuestion');
const prettierQuestion = require('./prettierQuestion');

const createOntarioAppQuestions = (askProjectName) => [
  projectNameQuestion(askProjectName),
  ...languagePageQuestions,
  eslintQuestion,
  prettierQuestion,
];

module.exports = {
  createOntarioAppQuestions,
};
