const nunjucks = require('nunjucks');
const { write } = require('../../operations/file/write');
const { withErrorHandling } = require('../../errors/errorHandler');
const logger = require('../logger');
const TemplateRenderError = require('../../errors/TemplateRenderError'); // Import the custom error class

/**
 * Renders a template and writes the output to a specified file.
 *
 * @param {string} templatePath - Relative path to the template file within TEMPLATE_DIR.
 * @param {string} outputPath - The output file path.
 * @param {Object} context - Data to render the template with.
 * @returns {Promise<void>} A promise that resolves when the template is rendered and written successfully.
 * @throws {TemplateRenderError} Throws an error if rendering or writing the file fails.
 */
async function renderAndWrite(templatePath, outputPath, context) {
  logger.debug(`Rendering the template: ${templatePath}`);
  const content = nunjucks.render(templatePath, context);
  logger.debug(`Writing the file: ${outputPath}`);
  await write(outputPath, content);
}

module.exports = {
  renderAndWrite: withErrorHandling(renderAndWrite, TemplateRenderError),
};
