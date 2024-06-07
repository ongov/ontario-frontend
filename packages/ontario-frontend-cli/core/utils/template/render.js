const nunjucks = require('nunjucks');
const { write } = require('../../operations');
const logger = require('../logger');

/**
 * Renders a template and writes the output to a specified file.
 * @param {string} templatePath - Relative path to the template file within TEMPLATE_DIR.
 * @param {string} outputPath - The output file path.
 * @param {Object} context - Data to render the template with.
 */
async function renderAndWrite(templatePath, outputPath, context) {
  try {
    logger.debug('Rendering the template: ', templatePath);
    const content = nunjucks.render(templatePath, context);
    logger.debug('Writing the file: ', outputPath);
    await write(outputPath, content);
  } catch (error) {
    logger.error(`Failed to render and write ${outputPath}: ${error.message}`);
    throw new Error(error.message);
  }
}

module.exports = { renderAndWrite };
