const nunjucks = require('nunjucks');

/**
 * Configures the Nunjucks templating engine.
 * @param {string} templatesPath - Path to the directory containing template files.
 */
function configureTemplates(templatesPath) {
  // Setting up Nunjucks with the provided templates directory and enabling autoescape for security.
  nunjucks.configure(templatesPath, { autoescape: true });
}

/**
 * Map application templates to their correct output location in new projects.
 * 
 * @param {Array<string>} answers - The user answers from the CLI prompts.
 * @returns {Array<Object>} An array of template mappings.
 */
const ontarioCreateAppTemplates = (answers) => [
  { template: 'package.njk', outputDir: '', outputFile: 'package.json' },
  { template: 'README.njk', outputDir: '', outputFile: 'README.md' },
  { template: 'eleventy.njk', outputDir: '', outputFile: '.eleventy.js' },
  { template: 'en.njk', outputDir: 'src', outputFile: `${answers.enPage}.njk` },
  { template: 'index.njk', outputDir: 'src', outputFile: 'index.njk' },
  { template: 'fr.njk', outputDir: 'src', outputFile: `${answers.frPage}.njk` },
  { template: 'sitemap.njk', outputDir: 'src', outputFile: 'sitemap.njk' },
  { template: 'globals.njk', outputDir: 'src/_data', outputFile: 'globals.js' },
];

module.exports = { configureTemplates, ontarioCreateAppTemplates };
