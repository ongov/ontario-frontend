const { spawn } = require('child_process');

function installPackage(packageName, { cwd = '' } = {}) {
  return new Promise((resolve, reject) => {
    const process = spawn('npm', ['install', packageName], {
      stdio: 'inherit',
      cwd,
    });
    process.on('close', (code) => {
      if (code === 0) resolve();
      else
        reject(
          new Error(`npm install for ${packageName} failed with code ${code}`),
        );
    });
  });
}

/**
 * Runs `npm install` in the specified directory to install all dependencies listed in package.json.
 *
 * @param {string} projectPath - The path to the project directory where package.json is located.
 * @returns {Promise<void>} A promise that resolves when the installation is complete or rejects on failure.
 */
function installAllDependencies(projectPath) {
  return new Promise((resolve, reject) => {
    const npmInstall = spawn('npm', ['install'], {
      stdio: 'inherit',
      cwd: projectPath,
    });

    npmInstall.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`npm install failed with code ${code}`));
      }
    });
  });
}

module.exports = { installPackage, installAllDependencies };
