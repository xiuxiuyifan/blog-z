(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueShared = {}));
})(this, (function (exports) { 'use strict';

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

	Object.defineProperty(exports, '__esModule', { value: true });

}));
