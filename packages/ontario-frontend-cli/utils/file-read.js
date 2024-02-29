const fs = require('fs').promises;
const path = require('path');

// Define an asynchronous function to read the package.json file
const readPackageJson = async () => {
  // Construct the path to the package.json file
  const packageJsonPath = path.join(__dirname, '..', 'package.json');

  // Read the file as a string
  const data = await fs.readFile(packageJsonPath, 'utf-8');

  // Parse the JSON string into an object and return it
  return JSON.parse(data);
};

module.exports = {
  readPackageJson,
};
