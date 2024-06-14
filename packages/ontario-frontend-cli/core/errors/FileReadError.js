const GeneralError = require('./GeneralError');

class FileReadError extends GeneralError {
  constructor(functionName, args, message) {
    const [filePath] = args; // Destructure args to get specific values
    super(functionName, `Failed to read file at ${filePath}: ${message}`);
    this.name = 'FileReadError';
    this.filePath = filePath;
  }
}

module.exports = FileReadError;
