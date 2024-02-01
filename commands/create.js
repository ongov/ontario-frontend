// Import the required modules
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const inquirer = require('inquirer');
const nunjucks = require('nunjucks');
const questions = require('./questions/create-questions.js');
const chalk = require('chalk');
const figlet = require('figlet');

// Define the __filename and __dirname variables
// In CommonJS, these variables are automatically defined, but in ES modules, we need to define them ourselves
// const __filename = require.main.filename;
// const __dirname = path.dirname(__filename);

// Define the template directory
const TEMPLATE_DIR = path.resolve(__dirname, '../proj-templates');

// Configure Nunjucks with the template directory
nunjucks.configure(TEMPLATE_DIR);

async function createNewProject(answers, options) {
  // Store some user answers necessary for the subsequent steps
  const projectName = answers.projectName;
  const newProjectPath = path.resolve(answers.destination, projectName);

  // Create the directory for the new project
  console.log(
    chalk.green(
      `\nCreating a new Jamstack Eleventy project in ${newProjectPath}`,
    ),
  );
  createDirectory(newProjectPath);

  // Navigate to the newly created project directory
  console.log(chalk.green('Navigating to project directory'));
  process.chdir(newProjectPath);

  // Create all directories the new project requires
  console.log(chalk.green(`Creating test folders`));
  createDirectory('test');

  // Configuration for the new project
  const conf = {
    englishRoot: answers.enRoot,
    frenchRoot: answers.frRoot,
    createDate: new Date().toISOString(),
    projectName: answers.projectName,
    projectDescription: answers.projectDescription,
  };

  // Generate package.json file
  generateNunjucksFile('package.njk', 'package.json', conf);

  // Generate README.md file
  generateNunjucksFile('README.njk', 'README.md', conf);

  // Copy config files
  const sourceDir = path.join(__dirname, '../proj-files');
  try {
    console.log(chalk.blueBright('\nCopying config files'));
    fs.cpSync(sourceDir, newProjectPath, {
      recursive: true,
    });
  } catch (error) {
    console.log(chalk.red(error.message));
  }

  // Generate .eleventy.js file
  generateNunjucksFile('eleventy.njk', `.eleventy.js`, conf);

  // Navigate to src directory and generate template files
  console.log(chalk.blueBright('\nNavigating to src directory'));
  process.chdir('src');
  console.log(chalk.blueBright('Generating and writing template files'));

  // Generate main English-language page
  generateNunjucksFile('en.njk', `${answers.enRoot}.njk`, conf);

  // Generate root level redirect page
  generateNunjucksFile('index.njk', 'index.njk', conf);

  // Generate main French-language page
  generateNunjucksFile('fr.njk', `${answers.frRoot}.njk`, conf);

  // Generate sitemap.njk file
  generateNunjucksFile('sitemap.njk', 'sitemap.njk', conf);

  // Write script.js file
  fs.writeFileSync(
    'assets/js/script.js',
    '/* Add your script here */',
    (err) => {
      if (err) {
        console.error(chalk.red(err));
      } else {
        console.log(
          chalk.green('Wrote script.js file at src/assets/js/script.js'),
        );
      }
    },
  );

  // Navigate to _data directory and generate globals.js file
  console.log(chalk.blueBright('\nNavigating to _data directory'));
  process.chdir('_data');
  generateNunjucksFile('globals.njk', 'globals.js', conf);

  // Navigate to test directory and generate test.js file
  console.log(chalk.blueBright('\nNavigating to test directory'));
  process.chdir('../../test');
  generateNunjucksFile('test.njk', 'test.js', conf);

  // Navigate to project directory
  console.log(chalk.blueBright('\nNavigating to project directory'));
  process.chdir(newProjectPath);

  // Install npm dependencies
  console.log(
    chalk.blueBright('Installing npm dependencies. This may take a minute.'),
  );
  const npmInstall = spawn('npm', ['install'], { stdio: 'inherit' });
  await new Promise((resolve) => {
    npmInstall.on('close', resolve);
  });

  // Install toolkit dependency from local directory or npm
  const toolkitDependencyLocation = options.isLocal
    ? path.join(__dirname, '../')
    : '@ontario-digital-service/ontarioca-toolkit-core';

  console.log(
    chalk.magentaBright(
      `\nInstalling toolkit dependency from ${toolkitDependencyLocation}`,
    ),
  );
  const ourInstall = spawn(
    'npm',
    ['install', '-S', toolkitDependencyLocation],
    { stdio: 'inherit' },
  );
  await new Promise((resolve) => {
    ourInstall.on('close', resolve);
  });

  console.log(chalk.green('Npm dependencies installed successfully.'));

  // Initialize a new git repo
  console.log(chalk.blueBright('\nInitializing a new git repo...'));
  const gitInit = spawn('git', ['init'], { stdio: 'inherit' });
  await new Promise((resolve) => {
    gitInit.on('close', resolve);
  });
  console.log(
    chalk.green(
      '\nSuccessfully initialized a new git repository in your project.',
    ),
  );
  console.log(
    chalk.green(
      'You can now commit your initial project state with `git add .` and `git commit -m "initial commit"`',
    ),
  );
  console.log(
    chalk.green(
      'Remember to create, or request, a new repository on Gitlab and link it with this local repository.',
    ),
  );
  console.log(
    chalk.green(
      'You can link a remote repository with `git remote add origin [your-repo-url]`',
    ),
  );
  console.log(
    chalk.green(
      'After linking, you can push your commits to the remote repository with `git push -u origin main`',
    ),
  );

  console.log(chalk.green(figlet.textSync('New Project Created!')));
  console.log(chalk.yellow(`\nProject is now created in ${newProjectPath}`));
  console.log(chalk.yellow('You can run the project with `npm run serve`'));
  console.log(chalk.yellow('You can build the project with `npm run build`'));
}

// Function to create a directory
function createDirectory(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
    console.log(chalk.green(`Created directory: ${path}`));
  }
}

const generateNunjucksFile = (template, fileName, conf) => {
  // Render the template with the provided configuration
  const content = nunjucks.render(template, conf);

  // Write the rendered content to a file
  try {
    fs.writeFileSync(fileName, content);
    console.log(chalk.green(`File (${fileName}) written successfully!`));
  } catch (err) {
    console.error(chalk.red(err));
  }
};

function handleCreateCommand(cmd = {}) {
  const options = {
    isLocal: cmd.local, // Check if the user indicated they want to use a local version of the toolkit
  };

  inquirer.prompt(questions).then((answers) => {
    createNewProject(answers, options);
  });
}

module.exports = handleCreateCommand;
