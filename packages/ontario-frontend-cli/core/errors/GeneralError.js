class GeneralError extends Error {
  constructor(functionName, message) {
    super(`Error in function ${functionName}: ${message}`);
    this.name = 'GeneralError';
    this.functionName = functionName;
  }
}

module.exports = GeneralError;
