const logger = require('../logger');
/**
 * Given an object, extracts and returns all values associated 
 * with the provided key as an array.
 * 
 * @param {Object<String, Object>} obj - The JSON object containing nested objects with properties.
 * @param {String} key - The key whose values need to be extracted from each nested object.
 * 
 * @returns {Array} - An array of values corresponding to the specified key, filtered removing falsy values.
 * 
 * @example
 * const exampleData = { 
 *   item1: { child1: 'Alice', child2: 'Bob' }
 *   item2: { child1: 'Charlie', child2: 'Danielle' }
 *   item3: { child1: 'Eric' }
 * };
 * const child2Names = extractValuesForKey(exampleData, 'child2'); // Output: ['Bob', 'Danielle']
 */
const extractChildObjectValuesByKey = ({...obj}, key) => {
  if (typeof obj !== 'object' || obj === null) {
    logger.debug('param obj must be an Object. Returning empty array.');
    return [];
  }
  
  return Object.values(obj) // Convert top level object to an array of child objects
    .map((childObject) => childObject[key]) // Map to values of the specified key
    .filter(Boolean); // Filter out undefined values e.g. key does not exist on childObject
};

module.exports = {
  extractChildObjectValuesByKey
};