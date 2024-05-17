const projectNameQuestion = require('./projectNameQuestion');
const languagePageQuestions = require('./languagePageQuestions');
const eslintQuestion = require('./eslintQuestion');
const prettierQuestion = require('./prettierQuestion');

const createOntarioAppQuestions = [
  projectNameQuestion,
  ...languagePageQuestions, // Spread operator to include both questions
  eslintQuestion,
  prettierQuestion,
];

module.exports = {
  createOntarioAppQuestions,
};
