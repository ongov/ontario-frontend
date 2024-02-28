const { execSync } = require('child_process');

// Example usage: pnpm run publish:specific <package-name>
// This script is intended to be executed with a package name as an argument to publish a specific package.

// Retrieve the package name from the command line arguments. The package name is expected as the second argument.
const packageName = process.argv[2]; 

// Check if the package name has been provided; if not, display an error message and terminate the script.
if (!packageName) {
  console.error('Please specify a package name.');
  process.exit(1);
}

// Attempt to update the version and publish the specified package using pnpm commands.
try {
  // Update the version of the specified package to the next patch version.
  // The `--filter` flag targets the operation to the specified package only.
  // The `{ stdio: 'inherit' }` option ensures that the output of the command is visible in the terminal.
  execSync(`pnpm --filter ${packageName} version patch`, { stdio: 'inherit' });

  // Publish the updated package to the npm registry with public access.
  // This command also uses the `--filter` flag to target the specified package.
  execSync(`pnpm --filter ${packageName} publish --access public`, { stdio: 'inherit' });

  console.log(`${packageName} published successfully.`);
} catch (error) {
  console.error(`Failed to publish ${packageName}:`, error);
}
