var timeout = null;

/**
* @description Delays passing a value to a callback.
* @param {string} value - The value that will be passed to the callback
* @param {function} callback - The callback that will be passed the value
*/
export const inputDelay = (value, callback) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => callback(value), 500)
};
