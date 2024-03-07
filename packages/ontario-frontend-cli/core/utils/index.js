const { spawnAsync } = require('./process/spawnAsync');
const textStyling  = require('./styling/textStyling');
const { readPackageJson } = require('./project/readPackageJson');
const {
  configureTemplates,
  createOntarioAppTemplates,
} = require('./template/configure');
const { renderAndWrite } = require('./template/render');

module.exports = {
  spawnAsync,
  textStyling,
  readPackageJson,
  configureTemplates,
  renderAndWrite,
  createOntarioAppTemplates,
};
