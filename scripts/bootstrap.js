const { execSync } = require('child_process');
// Install dependencies and link any inter-package dependencies within the monorepo.
try {
  console.log('Bootstrapping the monorepo: Installing dependencies and linking packages...');
  
  // Execute the 'pnpm recursive install' command synchronously. This command traverses all packages in the monorepo, installing their dependencies and linking any packages that depend on each other.
  // The { stdio: 'inherit' } option ensures that the output of the command is directly shown in the terminal, providing real-time feedback on the installation process.
  execSync('pnpm recursive install', { stdio: 'inherit' });
  
  console.log('Monorepo bootstrap completed successfully.');
} catch (error) {
  // Catch any errors that occur during the execution of the 'pnpm recursive install' command.
  console.error('Failed to bootstrap the monorepo:', error);
  
  process.exit(1);
}
