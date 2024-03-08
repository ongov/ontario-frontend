const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Recursively deletes a folder and all its contents.
 * @param {string} directoryPath - The path to the directory to be deleted.
 */
const deleteFolderRecursive = function(directoryPath) {
  // Check if the directory exists before attempting to delete it.
  if (fs.existsSync(directoryPath)) {
    // Read all files and folders within the directory.
    fs.readdirSync(directoryPath).forEach((file, index) => {
      // Construct the path to the current item (file or folder).
      const curPath = path.join(directoryPath, file);
      // Check if the current path is a directory.
      if (fs.lstatSync(curPath).isDirectory()) {
        // If it's a directory, recursively call this function to delete its contents.
        deleteFolderRecursive(curPath);
      } else {
        // If it's a file, delete the file.
        fs.unlinkSync(curPath);
      }
    });
    // After all contents have been deleted, remove the now-empty directory.
    fs.rmdirSync(directoryPath);
  }
};

try {
  console.log('Cleaning the monorepo: Removing node_modules and build artifacts...');
  // Execute the pnpm command to recursively remove the node_modules directory in each package.
  // This is necessary to clean up dependencies and ensure a fresh state for installations.
  execSync('pnpm recursive exec -- rm -rf node_modules', { stdio: 'inherit' });
  // Additional cleaning operations can be added here, such as removing build outputs or temporary files.
  
  console.log('Monorepo cleaned successfully.');
} catch (error) {
  // Catch and log any errors that occur during the cleaning process.
  console.error('Failed to clean the monorepo:', error);
  process.exit(1);
}
