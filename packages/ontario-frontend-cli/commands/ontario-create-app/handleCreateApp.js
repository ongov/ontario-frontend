const path = require('path');
const inquirer = require('inquirer');
const {
  ensureDirectory,
  copy,
  installAllPackages,
} = require('../../core/operations');
const { handlePackageCopy } = require('../../core/utils/process/copyPackage');
const { textStyling } = require('../../core/utils');
const logger = require('../../core/utils/logger');
const {
  configureTemplates,
  renderAndWrite,
  ontarioCreateAppTemplates,
} = require('../../core/utils');
const {
  CREATE_TEMPLATE_DIR,
  CREATE_BOILERPLATE_DIR,
  LOCAL_CORE_DEPENDENCY_DIR,
} = require('../../core/config');
const { createOntarioAppQuestions } = require('../../core/questions');

configureTemplates(CREATE_TEMPLATE_DIR);

/**
 * Function to create a new Ontario Frontend project.
 * @param {Object} answers - The answers provided by the user.
 * @param {Object} options - Additional options for project creation.
 */
async function createNewProject(answers, options) {
  logger.debug('Answers received:', answers);
  logger.debug('Options received:', options);

  const newProjectPath = path.resolve(process.cwd(), answers.projectName);

  // Create the directory for the new project
  logger.info(`Creating a new Ontario Frontend project in ${newProjectPath}`);
  logger.debug(`Project path resolved to: ${newProjectPath}`);

  await ensureDirectory(newProjectPath);

  const ontarioFrontendDependency = options.isLocal
    ? `"file:${LOCAL_CORE_DEPENDENCY_DIR}/"`
    : '"latest"';

  // Configuration for the new project
  const conf = {
    ...answers,
    createDate: new Date().toISOString(),
    ontarioFrontendDependency: ontarioFrontendDependency,
  };

  logger.debug('Project configuration:', conf);

  logger.debug('Created project context');

  // Perform steps to set up the project
  await copyBoilerplateFiles(newProjectPath);
  await generateProjectFiles(newProjectPath, conf);
  await copyOptionalConfig(newProjectPath, conf);
  await installAllPackages(newProjectPath);

  logger.success('New Project Created!');
  logger.info(`Project is now created in ${newProjectPath}`);
  logger.info('You can run the project with `npm run serve`');
  logger.info('You can build the project with `npm run build`');
}

/**
 * Function to generate project files.
 * @param {string} newProjectPath - The path to the new project directory.
 * @param {Object} conf - The configuration object for the project.
 */
async function generateProjectFiles(newProjectPath, conf) {
  logger.info('Generating project files');
  logger.debug('Configuration for project files:', conf);

  const templates = ontarioCreateAppTemplates(conf);
  logger.debug('ontarioCreateAppTemplates(conf): ', templates);
  for (let { template, outputDir, outputFile } of templates) {
    const outputPath = path.join(newProjectPath, outputDir, outputFile);
    const directoryPath = path.dirname(outputPath); // Get the directory path for the current file

    await ensureDirectory(directoryPath);

    logger.info(`Generating ${template}`);
    logger.debug(`Rendering ${template} and writing to ${outputPath}`);
    await renderAndWrite(
      path.join(CREATE_TEMPLATE_DIR, template),
      outputPath,
      conf,
    );
    logger.success(`Generated ${outputPath}`);
  }
  logger.success('Generated project files');
}

/**
 * Function to copy boilerplate files.
 * @param {string} newProjectPath - The path to the new project directory.
 */
async function copyBoilerplateFiles(newProjectPath) {
  logger.info('Copying boilerplate files');
  await copy(CREATE_BOILERPLATE_DIR, newProjectPath);
  logger.success('Project boilerplate files copied successfully.');
}

/**
 * Function to copy optional ESLint and Prettier configurations.
 * @param {string} newProjectPath - The path to the new project directory.
 * @param {Object} conf - The configuration object for the project.
 */
async function copyOptionalConfig(newProjectPath, conf) {
  if (conf.addESLint) {
    logger.info('Copying ESLint config files');
    await handlePackageCopy(newProjectPath, 'eslint');
  }
  if (conf.addPrettier) {
    logger.info('Copying Prettier config files');
    await handlePackageCopy(newProjectPath, 'prettier');
  }
}

/**
 * Command handler for creating a new Ontario Frontend project.
 * @param {Object} cmd - The command object containing user inputs and options.
 */
async function handleCreateAppCommand(cmd = {}) {
  // Enable debug logging if --debug option is set
  logger.setDebug(cmd.debug);

  try {
    const options = parseOptions(cmd);

    logger.debug('Command options:', options);

    console.log(textStyling.banner('Ontario\nFrontend'));

    // Determine which questions to ask based on options passed to command
    const askQuestions = {
      askProjectName: !options.projectName,
      askEnPage: !options.enPage,
      askFrPage: !options.frPage,
    };

    const questions = createOntarioAppQuestions(askQuestions);
    const answers = await inquirer.prompt(questions);

    logger.debug('User answers:', answers);

    // Merge the answers with the provided projectName, enPage, and frPage if any
    const finalAnswers = {
      ...answers,
      projectName: options.projectName || answers.projectName,
      enPage: options.enPage || answers.enPage,
      frPage: options.frPage || answers.frPage,
    };

    logger.debug('Final answers:', finalAnswers);

    await createNewProject(finalAnswers, options);

    logger.success('Project creation successful!');
  } catch (error) {
    logger.error('Failed to create a new project:', error.message);
    if (cmd.debug) {
      console.error(error.stack); // Print the stack trace for debugging only if debug is enabled
    }
  }
}

/**
 * Parses the command options.
 * @param {Object} cmd - The command object containing user inputs and options.
 * @returns {Object} The parsed options.
 */
function parseOptions(cmd) {
  return {
    isLocal: cmd.local || false,
    projectName: cmd.projectName || '',
    enPage: cmd.enPage || '',
    frPage: cmd.frPage || '',
  };
}

module.exports = { handleCreateAppCommand };
