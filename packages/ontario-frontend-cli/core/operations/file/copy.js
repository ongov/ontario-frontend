const fs = require('fs');
const logger = require('../../utils/logger');

function copy(source, destination) {
    try {
        fs.cpSync(source, destination, { recursive: true });
        logger.info(`Copied from ${source} to ${destination}`);
    } catch (error) {
        logger.error(`Error copying files: ${error.message}`);
        // Rethrow
        throw error;
    }
}

module.exports = { copy };
