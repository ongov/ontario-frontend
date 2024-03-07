const fs = require('fs').promises;
const logger = require('../../utils/logger');

async function write(path, data) {
  try {
    await fs.writeFile(path, data, 'utf8');
    logger.info(`File written successfully: ${path}`);
  } catch (error) {
    logger.error(`Error writing to file: ${error.message}`);
    throw error;
  }
}

module.exports = { write };
