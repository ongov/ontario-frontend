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

async function createNewProject(answers, options) {
  const newProjectPath = path.resolve(process.cwd(), answers.projectName);

  // Create the directory for the new project
  logger.info(`Creating a new Ontario Frontend project in ${newProjectPath}`);
  ensureDirectory(newProjectPath);

  const ontarioFrontendDependency = options.isLocal
    ? `"file:${LOCAL_CORE_DEPENDENCY_DIR}/"`
    : '"latest"';

  // Configuration for the new project
  const conf = {
    ...answers, //Directly spread relevant answers
    createDate: new Date().toISOString(),
    ontarioFrontendDependency: ontarioFrontendDependency,
  };

  logger.success('Created project context');

  // Copy boilerplate files
  await copyBoilerplateFiles(newProjectPath);

  // Generate project files
  await generateProjectFiles(newProjectPath, conf);

  // Copy ESLint config if opted-in
  if (conf.addESLint) {
    try {
      await handlePackageCopy(newProjectPath, 'eslint');
    } catch (err) {
      throw new Error(`Failed to copy ESLint configuration: ${err.message}`);
    }
  }

  // Copy Prettier config if opted-in
  if (conf.addPrettier) {
    try {
      await handlePackageCopy(newProjectPath, 'prettier');
    } catch (err) {
      throw new Error(`Failed to copy Prettier configuration: ${err.message}`);
    }
  }

  // Install npm dependencies, including the core Frontend dependency
  await installAllPackages(newProjectPath);

  logger.success('New Project Created!');
  logger.info(`Project is now created in ${newProjectPath}`);
  logger.info('You can run the project with `npm run serve`');
  logger.info('You can build the project with `npm run build`');
}

async function generateProjectFiles(newProjectPath, conf) {
  logger.info('Generating project files');

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
      // Throw the error to halt the execution if one file fails to generate
      throw error;
    }
  }
  logger.success('Generated project files');
}

async function copyBoilerplateFiles(newProjectPath) {
  logger.info('Copying boilerplate files');
  copy(CREATE_BOILERPLATE_DIR, newProjectPath);
  logger.success('Project boilerplate files copied successfully.');
}

async function handleCreateAppCommand(cmd = {}) {
  try {
    // Extract options from the command
    const options = {
      isLocal: cmd.local, // Check if the user indicated they want to use a local version of the toolkit
      projectName: cmd.projectName, // Add projectName to options
    };

    // Print a header for the application in the terminal
    console.log(textStyling.banner('Ontario\nFrontend'));

    // If appName is provided, skip the project name question
    // Otherwise, prompt the user with all questions
    const answers = await inquirer.prompt(
      createOntarioAppQuestions(!options.projectName),
    );

    // Merge the answers with the provided appName, if any
    const finalAnswers = options.projectName
      ? { ...answers, projectName: options.projectName }
      : answers;

    // Create the new project with the collected answers and options
    await createNewProject(finalAnswers, options);

    logger.success('Project creation successful!');
  } catch (error) {
    logger.error('Failed to create a new project:', error.message);
  }
}

module.exports = { handleCreateAppCommand };
