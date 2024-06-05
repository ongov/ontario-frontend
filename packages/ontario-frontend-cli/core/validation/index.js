const { validFileName } = require('./fileNameValidator');
const {
  isPresent,
  isLowercase,
  isUrlSafe,
  doesNotStartWithDotOrUnderscore,
} = require('./validationUtils');
const {
  doesPackageJsonExist,
  isOntarioFrontendProject
} = require('./validatePackageJson');

module.exports = {
  validFileName,
  isPresent,
  isLowercase,
  isUrlSafe,
  doesNotStartWithDotOrUnderscore,
  doesPackageJsonExist,
  isOntarioFrontendProject
};
