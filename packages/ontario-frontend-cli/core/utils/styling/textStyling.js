const figlet = require('figlet');
const chalkColours = require('./chalkColours');

const banner = (text) =>
  chalkColours.banner(figlet.textSync(text, { horizontalLayout: 'full' }));

const question = (text) => chalkColours.question(text);

module.exports = { banner: banner, question: question };
