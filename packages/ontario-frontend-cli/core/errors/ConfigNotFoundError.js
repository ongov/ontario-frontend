const GeneralError = require('./GeneralError');

class ConfigNotFoundError extends GeneralError {
  constructor(functionName, args, message) {
    const [packageName] = args; // Destructure args to get specific values
    super(
      functionName,
      `Configuration for package ${packageName} not found: ${message}`,
    );
    this.name = 'ConfigNotFoundError';
    this.packageName = packageName;
  }
}

module.exports = ConfigNotFoundError;
