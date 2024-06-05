const fs = require('fs');
const nunjucks = require('nunjucks');
const logger = require('../../utils/logger');

/**
 * Renders a template with given context and writes it to a destination file.
 *
 * @param {string} templatePath - The path to the Nunjucks template file.
 * @param {string} destinationPath - The path where the output should be written.
 * @param {Object} context - The data to render the template with.
 */
function generate(templatePath, destinationPath, context) {
  try {
    // Render the template with the provided context
    const output = nunjucks.render(templatePath, context);

    // Write the rendered output to the destination path
    fs.writeFileSync(destinationPath, output);
    logger.info(`Generated file at ${destinationPath}`);
  } catch (error) {
    logger.error(`Error generating file from template: ${error.message}`);
    throw error;
  }
}

module.exports = { generate };
