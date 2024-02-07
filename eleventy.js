const MarkdownIt = require('markdown-it');
const fs = require('fs');
const matter = require('gray-matter');

const ontariocaLocaleStrings = require('./src/_data/locale-strings.json');

function ontariocaMergeLocaleStrings(directory) {
  const appFileDir = directory + '/src/_data/localization'
  let files = fs.readdirSync(directory + '/src/_data/localization');
  const localeStrings = files.reduce( (acum, curr) => {
    let localizationFile = require(`${appFileDir}/${curr}`);
    return {
      ...acum,
      ...localizationFile,
    }
  }, ontariocaLocaleStrings);

  return localeStrings;
}

function ontariocaEleventyConfigFunc(eleventyConfig, directory) {
  const md = new MarkdownIt({
    html: true,
  });

  eleventyConfig.addFilter('markdown', (content) => md.renderInline(content));
  eleventyConfig.addShortcode(
    'currentYear',
    () => `${String(new Date().getFullYear())}`,
  );
  eleventyConfig.addShortcode(
    'currentShortYear',
    () => `${String(new Date().getFullYear()).slice(-2)}`,
  );

  eleventyConfig.addShortcode('toolkitVersion', () => 'toolkitVersion');
  
  const localeStrings = ontariocaMergeLocaleStrings(directory);
  /* eslint-disable func-names */
  eleventyConfig.addFilter('localeString', function (key) {
    /* eslint-enable func-names */
    // Solution for accessing page front matter from https://stackoverflow.com/a/67746326
    const { page } = this.ctx;
    const str = fs.readFileSync(page.inputPath, 'utf8');
    const { data } = matter(str);
    const lang = data.lang || 'en';
    let localeString;

    if (key.includes('.')) {
      const keyArr = key.split('.');
      localeString = localeStrings[keyArr.shift()];
      if (keyArr.length > 0) {
        keyArr.forEach((k) => {
          localeString = localeString[k];
        });
      }
    } else {
      localeString = localeStrings[key];
    }
    if (Array.isArray(localeString)) {
      localeString = localeString.map((string) => string[lang]);
      return localeString;
    }

    return `${localeString[lang]}`;
  });
}

const ontariocaEleventyConfigObj = {
  templateFormats: [
    'njk',
    'html',
    // Make a ticket for removing md from template formats
  ],

  // If using Nunjucks, add these directories for the template and data resolution
  pathPrefix: '/',
  markdownTemplateEngine: 'njk',
  htmlTemplateEngine: 'njk',
  dataTemplateEngine: 'njk',
  dir: {
    input: './src',
    includes: '_includes',
    data: '_data',
    output: 'dist',
  },
};

module.exports = {
  ontariocaEleventyConfigFunc,
  ontariocaEleventyConfigObj,
  ontariocaLocaleStrings,
};
