const { spawn } = require('child_process');

function spawnAsync(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const subprocess = spawn(command, args, { stdio: 'inherit', ...options });
    subprocess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command "${command}" exited with code ${code}`));
      }
    });
  });
}

module.exports = spawnAsync;
