const nunjucks = require('nunjucks');
const { write } = require('../../operations/file/write');
const { withErrorHandling } = require('../errorHandler');
const logger = require('../logger');

/**
 * Renders a template and writes the output to a specified file.
 * @param {string} templatePath - Relative path to the template file within TEMPLATE_DIR.
 * @param {string} outputPath - The output file path.
 * @param {Object} context - Data to render the template with.
 */
const renderAndWrite = withErrorHandling(
  async (templatePath, outputPath, context) => {
    logger.debug(`Rendering the template: ${templatePath}`);
    const content = nunjucks.render(templatePath, context);
    logger.debug(`Writing the file: ${outputPath}`);
    await write(outputPath, content);
  },
);

module.exports = { renderAndWrite };
