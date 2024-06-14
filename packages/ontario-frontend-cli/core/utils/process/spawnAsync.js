const { spawn } = require('child_process');
const logger = require('../logger');

/**
 * Spawns a child process to run a command with specified arguments.
 *
 * @param {string} command - The command to run.
 * @param {Array<string>} args - The arguments to pass to the command.
 * @param {Object} [options={}] - Options to pass to the spawn function.
 * @returns {Promise<void>} A promise that resolves when the command completes successfully or rejects on failure.
 */
const spawnAsync = async (command, args, options = {}) => {
  logger.debug(`Running command: ${command} ${args.join(' ')} with options:`, options);

  return new Promise((resolve, reject) => {
    const subprocess = spawn(command, args, { stdio: 'inherit', ...options });

    subprocess.on('close', (code) => {
      if (code === 0) {
        logger.debug(`Command "${command} ${args.join(' ')}" completed successfully.`);
        resolve();
      } else {
        logger.error(`Command "${command} ${args.join(' ')}" exited with code ${code}.`);
        reject(new Error(`Command "${command} ${args.join(' ')}" exited with code ${code}`));
      }
    });

    subprocess.on('error', (err) => {
      logger.error(`Error while running command "${command} ${args.join(' ')}": ${err.message}`);
      reject(err);
    });
  });
};

module.exports = spawnAsync;
