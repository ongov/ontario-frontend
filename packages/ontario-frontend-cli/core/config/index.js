const path = require('path');

const rootDir = path.resolve(__dirname, '../../');
const packagesDir = path.resolve(rootDir, '../');

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
};
