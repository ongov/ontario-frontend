const GeneralError = require('./GeneralError');

class SpawnProcessError extends GeneralError {
  constructor(functionName, args, message) {
    const [command] = args; // Destructure args to get specific values
    super(functionName, `Failed to execute command "${command}": ${message}`);
    this.name = 'SpawnProcessError';
    this.command = command;
  }
}

module.exports = SpawnProcessError;
