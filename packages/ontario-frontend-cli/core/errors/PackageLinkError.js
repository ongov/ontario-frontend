const GeneralError = require('./GeneralError');

class PackageLinkError extends GeneralError {
  constructor(functionName, args, message) {
    const [packageName] = args; // Destructure args to get specific values
    super(functionName, `Failed to link local package ${packageName}: ${message}`);
    this.name = 'PackageLinkError';
    this.packageName = packageName;
  }
}

module.exports = PackageLinkError;
