const { validFileName } = require('../validation');
const { question } = require('../utils/styling/textStyling');

const languagePageQuestions = [
  {
    type: 'input',
    name: 'enRoot',
    message: question('English-language page name (for URL path):\n'),
    validate: validFileName,
  },
  {
    type: 'input',
    name: 'frRoot',
    message: question('French-language page name (for URL path):\n'),
    validate: validFileName,
  }
];

module.exports = languagePageQuestions;
