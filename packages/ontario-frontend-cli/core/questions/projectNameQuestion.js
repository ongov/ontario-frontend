const { validFileName } = require('../validation');
const { question } = require('../utils/styling/textStyling');

const projectNameQuestion = (askProjectName) => ({
  type: 'input',
  name: 'projectName',
  message: question('Project name (lowercase, hyphens, underscores allowed):\n'),
  default: 'my-frontend-project',
  filter: (input) => input.trim().toLowerCase(), // Normalize input
  validate: validFileName,
  when: askProjectName,
});

module.exports = projectNameQuestion;
