const figlet = require('figlet');
const chalkColours = require('./chalkColours');

/**
 * Generates a banner text with specified styling.
 *
 * @param {string} text - The text to display in the banner.
 * @returns {string} - The styled banner text.
 */
const banner = (text) =>
  chalkColours.banner(figlet.textSync(text, { horizontalLayout: 'full' }));

/**
 * Styles a question text with the defined color.
 *
 * @param {string} text - The text to style.
 * @returns {string} - The styled question text.
 */
const question = (text) => chalkColours.question(text);

module.exports = { banner, question };
