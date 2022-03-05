const isObject = val => typeof val == 'object' && val != null;
const isNumber = val => typeof val == 'number';
const isFunction = val => typeof val == 'function';
const isString = val => typeof val == 'string';
const isBoolean = val => typeof val == 'boolean';
const isArray = val => Array.isArray(val);
const extend = Object.assign;

export { extend, isArray, isBoolean, isFunction, isNumber, isObject, isString };
