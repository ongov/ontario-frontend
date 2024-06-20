const { copy } = require('./file/copy');
const { ensureDirectoryExists } = require('./file/ensureDirectoryExists');
const { remove } = require('./file/remove');
const { write } = require('./file/write');
const { installPackages, installAllPackages, linkLocalPackages } = require('./npm/install');
const { uninstallPackages } = require('./npm/uninstall');

module.exports = {
  // File operations
  copy,
  ensureDirectoryExists,
  remove,
  write,
  // NPM operations
  installPackages,
  installAllPackages,
  linkLocalPackages,
  uninstallPackages
};
