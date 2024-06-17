const path = require('path');

const rootDir = path.resolve(__dirname, '../../');
const packagesDir = path.resolve(rootDir, '../');

const packageEslint = require('./packages/eslint.json');
const packagePrettier = require('./packages/prettier.json');

module.exports = {
  CREATE_TEMPLATE_DIR: path.join(
    rootDir,
    'resources',
    'templates',
    'ontario-create-app',
  ),
  CREATE_BOILERPLATE_DIR: path.join(
    rootDir,
    'resources',
    'boilerplate',
    'ontario-create-app',
  ),
  SHARED_BOILERPLATE_DIR: path.join(
    rootDir,
    'resources',
    'boilerplate',
    'shared',
  ),
  LOCAL_CORE_DEPENDENCY_DIR: path.join(packagesDir, 'ontario-frontend'),
  ROOT_DIR: rootDir,
  PACKAGES_CONFIG: { ...packageEslint, ...packagePrettier },
};
