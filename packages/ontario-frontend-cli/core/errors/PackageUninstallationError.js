const GeneralError = require('./GeneralError');

class PackageUninstallationError extends GeneralError {
  constructor(functionName, args, message) {
    const packageNames = args;
    const packages = Array.isArray(packageNames)
      ? packageNames.join(', ')
      : packageNames;
    super(
      functionName,
      `Failed to uninstall packages [${packages}]: ${message}`,
    );
    this.name = 'PackageUninstallationError';
    this.packageNames = packageNames;
  }
}

module.exports = PackageUninstallationError;
