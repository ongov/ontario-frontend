const GeneralError = require('./GeneralError');

class FileRemoveError extends GeneralError {
  constructor(functionName, args, message) {
    const [filePath] = args; // Destructure args to get specific values
    super(functionName, `Failed to remove file at ${filePath}: ${message}`);
    this.name = 'FileRemoveError';
    this.filePath = filePath;
  }
}

module.exports = FileRemoveError;
