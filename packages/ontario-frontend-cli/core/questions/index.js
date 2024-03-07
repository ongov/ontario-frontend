const projectNameQuestion = require('./projectNameQuestion');
const languagePageQuestions = require('./languagePageQuestions');
const eslintQuestion = require('./eslintQuestion');

const createOntarioAppQuestions = [
  projectNameQuestion,
  ...languagePageQuestions, // Spread operator to include both questions
  eslintQuestion,
];

module.exports = {
  createOntarioAppQuestions,
};
