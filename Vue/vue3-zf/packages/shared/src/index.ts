export const isObject = val => typeof val == 'object' && val != null
export const isNumber = val => typeof val == 'number'
export const isFunction = val => typeof val == 'function'
export const isString = val => typeof val == 'string'
export const isBoolean = val => typeof val == 'boolean'
export const isArray = val => Array.isArray(val)

export const extend = Object.assign