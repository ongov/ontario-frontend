const GeneralError = require('./GeneralError');

class TemplateRenderError extends GeneralError {
  constructor(functionName, args, message) {
    const [templatePath, outputPath] = args; // Destructure args to get specific values
    super(
      functionName,
      `Failed to render template ${templatePath} to ${outputPath}: ${message}`,
    );
    this.name = 'TemplateRenderError';
    this.templatePath = templatePath;
    this.outputPath = outputPath;
  }
}

module.exports = TemplateRenderError;
