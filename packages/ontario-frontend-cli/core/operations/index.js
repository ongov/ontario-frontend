const { copy } = require('./file/copy');
const { ensureDirectory } = require('./file/ensureDirectory');
const { generate } = require('./file/generate');
const { remove } = require('./file/remove');
const { write } = require('./file/write');
const { installPackages, installAllPackages } = require('./npm/install');
const { uninstallPackages } = require('./npm/uninstall');

module.exports = {
  // File operations
  copy,
  ensureDirectory,
  generate,
  remove,
  write,
  // NPM operations
  installPackages,
  installAllPackages,
  uninstallPackages
};
