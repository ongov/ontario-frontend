const GeneralError = require('./GeneralError');

class PackageCopyOperationError extends GeneralError {
  constructor(functionName, args, message) {
    const [ outputPath, packageName ] = args; // Destructure args to get specific values
    super(
      functionName,
      `Failed to copy package ${packageName} to ${outputPath}: ${message}`,
    );
    this.name = 'PackageCopyOperationError';
    this.packageName = packageName;
    this.outputPath = outputPath;
  }
}

module.exports = PackageCopyOperationError;
