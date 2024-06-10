const fs = require('fs').promises;
const nunjucks = require('nunjucks');
const logger = require('../../utils/logger');
const { withErrorHandling } = require('../../utils/errorHandler');

/**
 * Renders a template with given context and writes it to a destination file.
 *
 * @param {string} templatePath - The path to the Nunjucks template file.
 * @param {string} destinationPath - The path where the output should be written.
 * @param {Object} context - The data to render the template with.
 * @returns {Promise<void>}
 */
const generate = withErrorHandling(async (templatePath, destinationPath, context) => {
  // Render the template with the provided context
  const output = nunjucks.render(templatePath, context);

  // Write the rendered output to the destination path
  await fs.writeFile(destinationPath, output, 'utf8');
  logger.info(`Generated file at ${destinationPath}`);
});

module.exports = { generate };
