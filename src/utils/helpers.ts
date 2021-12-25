interface Collection { [key: string]: any }

export const validatePublicKey = (pbk: string) =>  /^[0-9a-f]{64}$/.test(pbk);

export const deepMergeObj = (obj1: Collection, obj2: Collection): Collection =>
  Object.keys({ ...obj2 }).reduce((obj, key) => (
    typeof obj2[key] === 'object' && typeof obj1[key] === 'object'
      && !Array.isArray(obj2[key]) && !Array.isArray(obj1[key])
      ? { ...obj, [key]: deepMergeObj(obj1[key], obj2[key]) }
      : { ...obj, [key]: obj2[key] }
  ), obj1);

/**
* Checks if the given collection is empty.
* @param {Object|Array} collection
* @returns {Boolean}
*/
export const isEmpty = (collection: any[]|Collection|undefined) => {
  if (!collection) return true;
  if (Array.isArray(collection)) {
    return collection.length === 0;
  }

  return Object.keys(collection).length === 0;
};

/**
* Returns the size of a given string in bytes
*
* @param {string} str - a random string
* @returns {number} - string size in bytes
*/
export const sizeOfString = (str = '') => encodeURI(str).split(/%..|./).length - 1;

/**
* Convert given strings to camel case
* All below string convert into equipmentClassName
* EquipmentClass name
* Equipment className
* equipment class name
* Equipment Class Name
*
* @param {String} str - The string to convert to camelCase
* @return {String} camelCased string
*/
export const camelize = (str: string) =>
  str
    .replace(
      /(?:^\w|[A-Z]|\b\w)/g,
      (word, index) => (index === 0
        ? word.toLowerCase()
        : word.toUpperCase()),
    )
    .replace(/\s+/g, '');

/**
* Convert given strings to capitalized format
* sample string -> Sample string
* sampleString -> Samplestring
*
* @param {String} str - The string to convert to capitalized
* @return {String} capitalized string
*/
export const capitalize = (str: string) => str.replace(/^[a-z]/, (c) => c.toUpperCase()).replace('LSK', 'Lsk');
