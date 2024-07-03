const path = require('path');
const inquirer = require('inquirer');
const {
  ensureDirectoryExists,
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
  DEPENDENCIES,
  DEV_DEPENDENCIES,
  ESLINT_DEPENDENCIES,
  PRETTIER_DEPENDENCIES,
} = require('../../core/config');
const { createOntarioAppQuestions } = require('../../core/questions');

configureTemplates(CREATE_TEMPLATE_DIR);

/**
 * Command handler for creating a new Ontario Frontend project.
 * @param {Object} cmd - The command object containing user inputs and options.
 */
async function handleCreateAppCommand(cmd = {}) {
  console.log(textStyling.banner('Ontario\nFrontend'));

  try {
    const options = parseOptions(cmd);
    const questionsToAsk = determineQuestionsToAsk(options);
    const answers = await inquirer.prompt(questionsToAsk);

    logger.debug('User answers:', answers);

    const finalAnswers = mergeOptionsAndAnswers(options, answers);
    logger.debug('Final answers:', finalAnswers);

    await createNewProject(finalAnswers, options);

    logger.success('Project creation successful!');
  } catch (error) {
    logger.error('Failed to create a new project:', error.message);
    if (cmd.debug) {
      logger.error(error.stack);
    }
  }
}

/**
 * Parses the command options.
 * @param {Object} cmd - The command object containing user inputs and options.
 * @returns {Object} The parsed options.
 */
function parseOptions(cmd) {
  const options = {
    isLocal: cmd.local || false,
    projectName: cmd.projectName || '',
    enPage: cmd.enPage || '',
    frPage: cmd.frPage || '',
    addESLint: typeof cmd.eslint === 'boolean' ? cmd.eslint : undefined,
    addPrettier: typeof cmd.prettier === 'boolean' ? cmd.prettier : undefined,
  };
  logger.debug('Parsed options:', options);
  return options;
}

/**
 * Determines the questions to ask based on the parsed options.
 * @param {Object} options - The parsed command options.
 * @returns {Array} The questions to ask.
 */
function determineQuestionsToAsk(options) {
  const askQuestions = {
    askProjectName: !options.projectName,
    askEnPage: !options.enPage,
    askFrPage: !options.frPage,
    askESLint: options.addESLint === undefined,
    askPrettier: options.addPrettier === undefined,
  };

  const questionsToAsk = createOntarioAppQuestions(askQuestions);
  logger.debug('Questions to ask:', questionsToAsk);
  return questionsToAsk;
}

/**
 * Merges the command options and user-provided answers.
 * @param {Object} options - The parsed command options.
 * @param {Object} answers - The answers provided by the user.
 * @returns {Object} The merged options and answers.
 */
function mergeOptionsAndAnswers(options, answers) {
  const finalAnswers = {
    ...answers,
    projectName: options.projectName || answers.projectName,
    enPage: options.enPage || answers.enPage,
    frPage: options.frPage || answers.frPage,
    addESLint:
      options.addESLint !== undefined ? options.addESLint : answers.addESLint,
    addPrettier:
      options.addPrettier !== undefined
        ? options.addPrettier
        : answers.addPrettier,
  };
  logger.debug('Merged options and answers:', finalAnswers);
  return finalAnswers;
}

/**
 * Function to create a new Ontario Frontend project.
 * @param {Object} answers - The answers provided by the user.
 * @param {Object} options - Additional options for project creation.
 */
async function createNewProject(answers, options) {
  logger.debug('Answers received:', answers);
  logger.debug('Options received:', options);

  const newProjectPath = path.resolve(process.cwd(), answers.projectName);
  logger.debug(`Project path resolved to: ${newProjectPath}`);

  logger.info(`Creating a new Ontario Frontend project in ${newProjectPath}`);
  await ensureDirectoryExists(newProjectPath);

  const conf = createProjectConfig(answers, options);
  logger.debug('Project configuration:', conf);

  await setupNewProject(newProjectPath, conf);
  await installAllPackages(newProjectPath);

  logger.info('New Project Created!');
  logger.info(`Project is now created in ${newProjectPath}`);
  logger.info('You can run the project with `npm run serve`');
  logger.info('You can build the project with `npm run build`');
}

/**
 * Creates the project configuration.
 * @param {Object} answers - The answers provided by the user.
 * @param {Object} options - Additional options for project creation.
 * @returns {Object} The project configuration object.
 */
function createProjectConfig(answers, options) {
  const conf = {
    ...answers,
    createDate: new Date().toISOString(),
    ontarioFrontendDependency: options.isLocal
      ? `"file:${LOCAL_CORE_DEPENDENCY_DIR}/"`
      : `"${DEPENDENCIES['@ongov/ontario-frontend']}"`,
    eslintDependencies: answers.addESLint ? ESLINT_DEPENDENCIES : {},
    prettierDependencies: answers.addPrettier ? PRETTIER_DEPENDENCIES : {},
    devDependencies: DEV_DEPENDENCIES,
    dependencies: DEPENDENCIES,
  };
  logger.debug('Created project configuration:', conf);
  return conf;
}

/**
 * Sets up the new project by copying boilerplate files and generating project-specific files.
 * @param {string} newProjectPath - The path to the new project directory.
 * @param {Object} conf - The configuration object for the project.
 */
async function setupNewProject(newProjectPath, conf) {
  await copyBoilerplateFiles(newProjectPath);
  await generateProjectFiles(newProjectPath, conf);
  await copyOptionalConfig(newProjectPath, conf);
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
  logger.debug('ontarioCreateAppTemplates(conf):', templates);
  for (let { template, outputDir, outputFile } of templates) {
    const outputPath = path.join(newProjectPath, outputDir, outputFile);
    const directoryPath = path.dirname(outputPath); // Get the directory path for the current file

    await ensureDirectoryExists(directoryPath);

    logger.info(`Generating ${template}`);
    logger.debug(`Rendering ${template} and writing to ${outputPath}`);
    await renderAndWrite(
      path.join(CREATE_TEMPLATE_DIR, template),
      outputPath,
      conf,
    );
    logger.debug(`Generated ${outputPath}`);
  }
  logger.info('Generated project files');
}

/**
 * Function to copy boilerplate files.
 * @param {string} newProjectPath - The path to the new project directory.
 */
async function copyBoilerplateFiles(newProjectPath) {
  logger.info('Copying boilerplate files');
  await copy(CREATE_BOILERPLATE_DIR, newProjectPath);
  logger.debug('Project boilerplate files copied successfully.');
}

/**
 * Function to copy optional ESLint and Prettier configurations.
 * @param {string} newProjectPath - The path to the new project directory.
 * @param {Object} conf - The configuration object for the project.
 */
async function copyOptionalConfig(newProjectPath, conf) {
  if (conf.addESLint) {
    logger.info('Copying ESLint config files');
    logger.debug('Copying ESLint config files to', newProjectPath);
    await handlePackageCopy(newProjectPath, '@ongov/eslint-config-ontario-frontend');
    logger.debug('ESLint config files copied successfully.');
  }
  if (conf.addPrettier) {
    logger.info('Copying Prettier config files');
    logger.debug('Copying Prettier config files to', newProjectPath);
    await handlePackageCopy(newProjectPath, '@ongov/prettier-config-ontario-frontend');
    logger.debug('Prettier config files copied successfully.');
  }
}

module.exports = { handleCreateAppCommand };
