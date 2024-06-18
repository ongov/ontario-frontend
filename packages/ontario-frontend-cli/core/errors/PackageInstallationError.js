const GeneralError = require('./GeneralError');

class PackageInstallationError extends GeneralError {
  constructor(functionName, args, message) {
    const [packageName] = args; // Destructure args to get specific values
    super(functionName, `Failed to install package ${packageName}: ${message}`);
    this.name = 'PackageInstallationError';
    this.packageName = packageName;
  }
}

module.exports = PackageInstallationError;
