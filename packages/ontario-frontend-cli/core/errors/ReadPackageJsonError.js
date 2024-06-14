const GeneralError = require('./GeneralError');

class ReadPackageJsonError extends GeneralError {
  constructor(functionName, args, message) {
    const [dir] = args; // Destructure args to get specific values
    super(functionName, `Failed to read package.json from ${dir}: ${message}`);
    this.name = 'ReadPackageJsonError';
    this.dir = dir;
  }
}

module.exports = ReadPackageJsonError;
