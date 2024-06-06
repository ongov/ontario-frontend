const { validFileName } = require('../validation');
const { question } = require('../utils/styling/textStyling');

/**
 * Generates a question object for the project name.
 *
 * @param {boolean} askProjectName - Whether to ask for the project name.
 * @returns {Object} A question object to be used with inquirer.prompt.
 */
const projectNameQuestion = (askProjectName) => ({
  type: 'input',
  name: 'projectName',
  message: question(
    'Project name (lowercase, hyphens, underscores allowed):\n',
  ),
  default: 'my-frontend-project',
  filter: (input) => input.trim().toLowerCase(), // Normalize input
  validate: validFileName,
  when: askProjectName,
});

module.exports = projectNameQuestion;
