const path = require('path');

const rootDir = path.resolve(__dirname, '../../');
const packagesDir = path.resolve(rootDir, '../');

const packageEslint = require('./packages/eslint.json');
const packagePrettier = require('./packages/prettier.json');
const core = require('./packages/core.json');

module.exports = {
  DEPENDENCIES: {
    '@ongov/ontario-frontend': '^1.1.0',
  },
  DEV_DEPENDENCIES: {
    '@11ty/eleventy': '^1.0.1',
  },
  ESLINT_DEPENDENCIES: {
    eslint: '^8.57.0', // Updated to the latest version compatible with eslint-plugin-import
    'eslint-plugin-import': '^2.29.1',
    '@ongov/eslint-config-ontario-frontend': '^1.1.0',
  },
  PRETTIER_DEPENDENCIES: {
    prettier: '^3.3.2',
    '@ongov/prettier-config-ontario-frontend': '^1.1.0',
  },
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
  CORE_DEPENDENCY: core.core,
};
