/**
 * Takes an Object of Objects and extracts the values of a 
 * specified key from the child objects into an array.
 * 
 * @param {Object} parentObject - An object of objects.
 * @param {String} key - a string key/property within the child object
 * 
 * @returns {Array}
 */
const extractChildObjectValuesByKey = ({...parentObject}, key) => {
  return Object.values(parentObject) // Convert top level object to an array of child objects
    .map((childObject) => childObject[key]) // Map to values of the specified key
    .filter(Boolean); // Filter out undefined values e.g. key does not exist on childObject
};