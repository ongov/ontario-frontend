const GeneralError = require('./GeneralError');

class TemplateConfigurationError extends GeneralError {
  constructor(functionName, args, message) {
    const [templatesPath] = args; // Destructure args to get specific values
    super(
      functionName,
      `Failed to configure templates at ${templatesPath}: ${message}`,
    );
    this.name = 'TemplateConfigurationError';
    this.templatesPath = templatesPath;
  }
}

module.exports = TemplateConfigurationError;
