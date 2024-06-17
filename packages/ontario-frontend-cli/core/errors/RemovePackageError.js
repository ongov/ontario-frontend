const GeneralError = require('./GeneralError');

class RemovePackageError extends GeneralError {
  constructor(functionName, args, message) {
    const [packageName] = args; // Destructure args to get specific values
    super(functionName, `Failed to remove package ${packageName}: ${message}`);
    this.name = 'RemovePackageError';
    this.packageName = packageName;
  }
}

module.exports = RemovePackageError;
