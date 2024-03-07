const path = require('path');

const rootDir = path.resolve(__dirname, '../../');
const packagesDir = path.resolve(rootDir, '../');

module.exports = {
  CREATE_TEMPLATE_DIR: path.join(
    rootDir,
    'resources',
    'templates',
    'create-ontario-app',
  ),
  CREATE_BOILERPLATE_DIR: path.join(
    rootDir,
    'resources',
    'boilerplate',
    'create-ontario-app',
  ),
  SHARED_BOILERPLATE_DIR: path.join(
    rootDir,
    'resources',
    'boilerplate',
    'shared',
  ),

  LOCAL_CORE_DEPENDENCY_DIR: path.join(packagesDir, 'ontario-frontend'),
  ROOT_DIR: rootDir,
};
