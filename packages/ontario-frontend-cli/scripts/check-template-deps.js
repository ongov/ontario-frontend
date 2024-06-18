const path = require('path');
const { execSync } = require('child_process');
const nunjucks = require('nunjucks');
const { DEV_DEPENDENCIES, DEPENDENCIES, ESLINT_DEPENDENCIES, PRETTIER_DEPENDENCIES } = require('../core/config');

const TEMPLATE_PATH = path.resolve(__dirname, '../resources/templates/ontario-create-app/package.njk');

// Configure Nunjucks environment
nunjucks.configure({ autoescape: false });

/**
 * Render the Nunjucks template with dummy data to extract the dependencies.
 * @returns {Object} Parsed package.json content from the template.
 */
function renderTemplate() {
  const dummyData = {
    projectName: 'dummy-project',
    ontarioFrontendDependency: DEPENDENCIES['@ongov/ontario-frontend'],
    addESLint: true,
    addPrettier: true,
    eslintDependencies: ESLINT_DEPENDENCIES,
    prettierDependencies: PRETTIER_DEPENDENCIES,
    devDependencies: DEV_DEPENDENCIES,
    dependencies: DEPENDENCIES,
  };

  const renderedTemplate = nunjucks.render(TEMPLATE_PATH, dummyData);
  return JSON.parse(renderedTemplate);
}

/**
 * Get the current version of a package from npm.
 * @param {string} packageName - The name of the package.
 * @returns {string} The latest version of the package.
 */
function getLatestVersion(packageName) {
  const result = execSync(`npm show ${packageName} version`, { encoding: 'utf8' });
  return result.trim();
}

/**
 * Check if the dependencies in the template are up to date.
 */
function checkDependencies() {
  try {
    const parsedTemplate = renderTemplate();
    const dependencies = parsedTemplate.dependencies || {};
    const devDependencies = parsedTemplate.devDependencies || {};

    // Combine dependencies and devDependencies
    const allDependencies = { ...dependencies, ...devDependencies };

    Object.keys(allDependencies).forEach((dep) => {
      const currentVersion = allDependencies[dep];
      const latestVersion = getLatestVersion(dep);
      if (currentVersion !== latestVersion) {
        console.log(`Update available for ${dep}: ${currentVersion} -> ${latestVersion}`);
      } else {
        console.log(`${dep} is up to date.`);
      }
    });
  } catch (error) {
    console.error('Error checking dependencies:', error.message);
  }
}

// Run the dependency check
checkDependencies();
