const { validFileName } = require('../validation');
const { question } = require('../utils/styling/textStyling');

/**
 * Generates an array of question objects for the English and French page names.
 *
 * @param {boolean} askEnPage - Whether to ask for the English page name.
 * @param {boolean} askFrPage - Whether to ask for the French page name.
 * @returns {Array<Object>} An array of question objects to be used with inquirer.prompt.
 */
const languagePageQuestions = (askEnPage, askFrPage) => [
  {
    type: 'input',
    name: 'enPage',
    message: question('English-language page name (for URL path; lowercase, alphanumeric, hyphens, underscores allowed):\n'),
    validate: validFileName,
    when: askEnPage,
  },
  {
    type: 'input',
    name: 'frPage',
    message: question('French-language page name (for URL path; lowercase, alphanumeric, hyphens, underscores allowed):\n'),
    validate: validFileName,
    when: askFrPage,
  },
];

module.exports = languagePageQuestions;
