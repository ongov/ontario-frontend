const GeneralError = require('./GeneralError');

class CopyOperationError extends GeneralError {
  constructor(functionName, args, message) {
    console.log(args[0]);
    const { source, destination } = args[0]; // Destructure args to get specific values
    super(
      functionName,
      `Failed to copy from ${source} to ${destination}: ${message}`,
    );
    this.name = 'CopyOperationError';
    this.source = source;
    this.destination = destination;
  }
}

module.exports = CopyOperationError;
