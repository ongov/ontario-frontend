const { execSync } = require('child_process');

// This script is intended for updating the version of a specific package or all packages within a monorepo.
// Usage example: pnpm run update:version <package-name> <version-bump>
// <package-name> is optional and specifies which package to update.
// <version-bump> specifies the type of version update (major, minor, patch) and defaults to 'patch'.

// Retrieve the package name from command line arguments. It's optional and targets a specific package for version update.
const packageName = process.argv[2]; 
// Retrieve the version bump type from command line arguments, defaulting to 'patch' if no specific type is provided.
const versionBump = process.argv[3] || 'patch';

/**
 * Updates the version of a given package or all packages in the monorepo.
 * @param {string} packageName - The name of the package to update. If not provided, all packages are updated.
 * @param {string} versionBump - The type of version update (major, minor, patch).
 */
function updateVersion(packageName, versionBump) {
  try {
    // Determine the scope of the version update command based on the presence of a package name.
    // If a package name is provided, target that specific package; otherwise, use '--recursive' to target all packages.
    const scope = packageName ? `--filter ${packageName}` : '--recursive';
    // Construct the pnpm command for updating the package version using the determined scope and version bump type.
    const command = `pnpm ${scope} version ${versionBump}`;
    // Execute the version update command, inheriting stdio to display the command output in the current terminal.
    execSync(command, { stdio: 'inherit' });

    console.log(`Successfully updated ${packageName || 'all packages'} to ${versionBump} version.`);
  } catch (error) {
    console.error(`Failed to update version for ${packageName || 'all packages'}:`, error);
    process.exit(1);
  }
}

// Execute the updateVersion function with the provided package name (or lack thereof) and version bump type.
updateVersion(packageName, versionBump);
