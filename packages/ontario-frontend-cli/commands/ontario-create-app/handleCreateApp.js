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

  ensureDirectory(newProjectPath);
  logger.debug(`Directory created: ${newProjectPath}`);

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

  logger.success('Created project context');

  // Perform steps to set up the project
  await copyBoilerplateFiles(newProjectPath);
  logger.debug('Boilerplate files copied successfully');

  await generateProjectFiles(newProjectPath, conf);
  logger.debug('Project files generated successfully');

  // Copy ESLint and Prettier configurations if opted-in
  await copyOptionalConfig(newProjectPath, conf);

  // Install npm dependencies, including the core Frontend dependency
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
  for (let { template, outputDir, outputFile } of templates) {
    const outputPath = path.join(newProjectPath, outputDir, outputFile);
    const directoryPath = path.dirname(outputPath); // Get the directory path for the current file

    // Ensure the directory exists before trying to write the file
    ensureDirectory(directoryPath);

    try {
      logger.info(`Generating ${template}`);
      await renderAndWrite(
        path.join(CREATE_TEMPLATE_DIR, template),
        outputPath,
        conf,
      );
      logger.success(`Generated ${outputPath}`);
    } catch (error) {
      logger.error(
        `Failed to render and write ${outputPath}: ${error.message}`,
      );
      throw error;
    }
  }
  logger.success('Generated project files');
}

/**
 * Function to copy boilerplate files.
 * @param {string} newProjectPath - The path to the new project directory.
 */
async function copyBoilerplateFiles(newProjectPath) {
  logger.info('Copying boilerplate files');
  copy(CREATE_BOILERPLATE_DIR, newProjectPath);
  logger.success('Project boilerplate files copied successfully.');
}

/**
 * Function to copy optional ESLint and Prettier configurations.
 * @param {string} newProjectPath - The path to the new project directory.
 * @param {Object} conf - The configuration object for the project.
 */
async function copyOptionalConfig(newProjectPath, conf) {
  if (conf.addESLint) {
    await handlePackageCopy(newProjectPath, 'eslint');
  }
  if (conf.addPrettier) {
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
    // Extract options from the command
    const options = {
      isLocal: cmd.local || false, // Check if the user indicated they want to use a local version of the toolkit
      projectName: cmd.projectName || '',
      enPage: cmd.enPage || '',
      frPage: cmd.frPage || '',
    };

    logger.debug('Command options:', options);

    // Print a header for the application in the terminal
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

    // Create the new project with the collected answers and options
    await createNewProject(finalAnswers, options);

    logger.success('Project creation successful!');
  } catch (error) {
    logger.error('Failed to create a new project:', error.message);
    if (cmd.debug) {
      console.error(error.stack); // Print the stack trace for debugging only if debug is enabled
    }
  }
}

module.exports = { handleCreateAppCommand };
