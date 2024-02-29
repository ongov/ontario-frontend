module.exports = () => {
  const env = process.env.ELEVENTY_ENV || 'dev';

  // Relative to assetsRoot (see app-templateGlobals.js)
  const designSystemPath = '/vendor/ontario-design-system';
  const corePath = '/vendor/ontario-ca';

  const allowedFooterTypes = {
    default: 'default',
    expanded: 'expanded',
  };

  return {
    allowedFooterTypes,
    designSystemPath,
    corePath,
    env,
  };
};
