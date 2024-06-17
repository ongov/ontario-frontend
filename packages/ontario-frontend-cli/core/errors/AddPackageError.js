const GeneralError = require('./GeneralError');

class AddPackageError extends GeneralError {
  constructor(functionName, args, message) {
    const [packageName] = args; // Destructure args to get specific values
    super(functionName, `Failed to add package ${packageName}: ${message}`);
    this.name = 'AddPackageError';
    this.packageName = packageName;
  }
}

module.exports = AddPackageError;
