const GeneralError = require('./GeneralError');

class DirectoryCreationError extends GeneralError {
  constructor(functionName, args, message) {
    const [directoryPath] = args; // Destructure args to get specific values
    super(
      functionName,
      `Failed to ensure/create directory at ${directoryPath}: ${message}`,
    );
    this.name = 'DirectoryCreationError';
    this.directoryPath = directoryPath;
  }
}

module.exports = DirectoryCreationError;
