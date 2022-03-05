'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isObject = val => typeof val == 'object' && val != null;
const isNumber = val => typeof val == 'number';
const isFunction = val => typeof val == 'function';
const isString = val => typeof val == 'string';
const isBoolean = val => typeof val == 'boolean';
const isArray = val => Array.isArray(val);
const extend = Object.assign;

exports.extend = extend;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isString = isString;
