const nunjucks = require('nunjucks');

/**
 * Configures the Nunjucks templating engine.
 * @param {string} templatesPath - Path to the directory containing template files.
 */
function configureTemplates(templatesPath) {
  // Setting up Nunjucks with the provided templates directory and enabling autoescape for security.
  nunjucks.configure(templatesPath, { autoescape: true });
}

// TODO: Document this
// Map templates to its correct output location
const createOntarioAppTemplates = (answers) => [
  { template: 'package.njk', outputDir: '', outputFile: 'package.json' },
  { template: 'README.njk', outputDir: '', outputFile: 'README.md' },
  { template: 'eleventy.njk', outputDir: '', outputFile: '.eleventy.js' },
  { template: 'en.njk', outputDir: 'src', outputFile: `${answers.enRoot}.njk` },
  { template: 'index.njk', outputDir: 'src', outputFile: 'index.njk' },
  { template: 'fr.njk', outputDir: 'src', outputFile: `${answers.frRoot}.njk` },
  { template: 'sitemap.njk', outputDir: 'src', outputFile: 'sitemap.njk' },
  { template: 'globals.njk', outputDir: 'src/_data', outputFile: 'globals.js' },
];

module.exports = { configureTemplates, createOntarioAppTemplates };
