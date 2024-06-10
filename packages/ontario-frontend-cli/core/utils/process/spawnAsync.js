const { spawn } = require('child_process');
const { withErrorHandling } = require('../errorHandler');

/**
 * Spawns a child process to run a command with specified arguments.
 *
 * @param {string} command - The command to run.
 * @param {Array<string>} args - The arguments to pass to the command.
 * @param {Object} options - Options to pass to the spawn function.
 * @returns {Promise<void>} A promise that resolves when the command completes successfully or rejects on failure.
 */
const spawnAsync = withErrorHandling(async (command, args, options = {}) => {
  return new Promise((resolve, reject) => {
    const subprocess = spawn(command, args, { stdio: 'inherit', ...options });
    subprocess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command "${command} ${args.join(' ')}" exited with code ${code}`));
      }
    });
  });
});

module.exports = spawnAsync;
