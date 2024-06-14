const fs = require('fs');
const path = require('path');
const glob = require('glob');
const util = require('util');
const resolve = require('resolve');

const requireResolve = util.promisify(resolve);

const projectRoot = path.resolve(__dirname, '..'); // Adjust the path to your project root

// Function to check if a module resolves
async function checkRequire(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const requirePattern = /require\(['"]([^'"]+)['"]\)/g;
  let match;

  while ((match = requirePattern.exec(content)) !== null) {
    const requiredModule = match[1];
    try {
      await requireResolve(requiredModule, { basedir: path.dirname(filePath) });
      console.log(`Resolved: ${requiredModule} in ${filePath}`);
    } catch (error) {
      console.error(`Failed to resolve: ${requiredModule} in ${filePath}`);
    }
  }
}

// Get the package name from the command line arguments
const packageName = process.argv[2];

if (!packageName) {
  console.error('Please specify a package name.');
  process.exit(1);
}

// Construct the path to the package
const packagePath = path.join(projectRoot, 'packages', packageName);

// Verify that the package directory exists
if (!fs.existsSync(packagePath)) {
  console.error(`Package directory not found: ${packagePath}`);
  process.exit(1);
}

// Find all JavaScript files in the package
const files = glob.sync('**/*.js', {
  cwd: packagePath,
  ignore: 'node_modules/**',
});

files.forEach((file) => {
  checkRequire(path.join(packagePath, file));
});
