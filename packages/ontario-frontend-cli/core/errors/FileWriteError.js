const GeneralError = require('./GeneralError');

class FileWriteError extends GeneralError {
  constructor(functionName, args, message) {
    const [filePath] = args; // Destructure args to get specific values
    super(functionName, `Failed to write file at ${filePath}: ${message}`);
    this.name = 'FileWriteError';
    this.filePath = filePath;
  }
}

module.exports = FileWriteError;
