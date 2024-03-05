const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const inquirer = require('inquirer');
const nunjucks = require('nunjucks');
const questions = require('./questions');
const colours = require('../utils/chalkColours');
const figlet = require('figlet');

// Define the __filename and __dirname variables
// In CommonJS, these variables are automatically defined, but in ES modules, we need to define them ourselves
// const __filename = require.main.filename;
// const __dirname = path.dirname(__filename);

// Define the template directory
const TEMPLATE_DIR = path.resolve(__dirname, './templates');

// Configure Nunjucks with the template directory
nunjucks.configure(TEMPLATE_DIR);

async function createNewProject(answers, options) {
  // Store some user answers necessary for the subsequent steps
  const projectName = answers.projectName;
  const newProjectPath = path.resolve(answers.destination, projectName);

  // Create the directory for the new project
  console.log(
    colours.info(
      `\nCreating a new Ontario Frontend project in ${newProjectPath}`,
    ),
  );
  createDirectory(newProjectPath);

  // Navigate to the newly created project directory
  console.log(colours.info('Navigating to project directory'));
  process.chdir(newProjectPath);

  // Configuration for the new project
  const conf = {
    englishRoot: answers.enRoot,
    frenchRoot: answers.frRoot,
    createDate: new Date().toISOString(),
    projectName: answers.projectName,
    projectDescription: answers.projectDescription,
    esLint: answers.esLint,
    prettier: answers.prettier,
  };

  // Generate package.json file
  generateNunjucksFile('package.njk', 'package.json', conf);

  // Generate README.md file
  generateNunjucksFile('README.njk', 'README.md', conf);

  // Generate ES Lint config file
  if (answers.esLint) {
    generateNunjucksFile('eslintrc.njk', '.eslintrc.js', conf);
  }
  // Generate Prettier config file
  if (answers.prettier) {
    generateNunjucksFile('prettier.config.njk', 'prettier.config.js', conf);
  }
  // Generate Prettier ignore file
  if (answers.prettier) {
    generateNunjucksFile('prettierignore.njk', '.prettierignore', conf);
  }

  // Copy config files
  const sourceDir = path.join(__dirname, './skeleton');
  try {
    console.log(colours.info('\nCopying config files'));
    fs.cpSync(sourceDir, newProjectPath, {
      recursive: true,
    });
  } catch (error) {
    console.log(colours.error(error.message));
  }

  // Generate .eleventy.js file
  generateNunjucksFile('eleventy.njk', `.eleventy.js`, conf);

  // Navigate to src directory and generate template files
  console.log(colours.info('\nNavigating to src directory'));
  process.chdir('src');
  console.log(colours.info('Generating and writing template files'));

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
        console.error(colours.error(err));
      } else {
        console.log(
          colours.success('Wrote script.js file at src/assets/js/script.js'),
        );
      }
    },
  );

  // Navigate to _data directory and generate globals.js file
  console.log(colours.info('\nNavigating to _data directory'));
  process.chdir('_data');
  generateNunjucksFile('globals.njk', 'globals.js', conf);

  // Navigate to project directory
  console.log(colours.info('\nNavigating to project directory'));
  process.chdir(newProjectPath);

  // Install npm dependencies
  console.log(
    colours.info('Installing npm dependencies. This may take a minute.'),
  );

  const npmInstall = spawn('npm', ['install'], { stdio: 'inherit' });

  await new Promise((resolve) => {
    npmInstall.on('close', resolve);
  });

  // Install core Frontend dependency from local directory or npm
  const coreDependencyLocation = options.isLocal
    ? path.join(__dirname, '../../ontario-frontend')
    : '@ongov/ontario-frontend';

  console.log(
    colours.info(
      `\nInstalling core Frontend dependency from ${coreDependencyLocation}`,
    ),
  );
  const ourInstall = spawn('npm', ['install', '-S', coreDependencyLocation], {
    stdio: 'inherit',
  });
  await new Promise((resolve) => {
    ourInstall.on('close', resolve);
  });

  console.log(colours.success('Npm dependencies installed successfully.'));

  console.log(colours.success(figlet.textSync('New Project\nCreated!')));
  console.log(colours.info(`\nProject is now created in ${newProjectPath}`));
  console.log(colours.info('You can run the project with `npm run serve`'));
  console.log(colours.info('You can build the project with `npm run build`'));
}

// Function to create a directory
function createDirectory(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
    console.log(colours.success(`Created directory: ${path}`));
  }
}

const generateNunjucksFile = (template, fileName, conf) => {
  // Render the template with the provided configuration
  const content = nunjucks.render(template, conf);

  // Write the rendered content to a file
  try {
    fs.writeFileSync(fileName, content);
    console.log(colours.success(`File (${fileName}) written successfully!`));
  } catch (err) {
    console.error(colours.error(err));
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
