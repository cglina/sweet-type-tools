/*
    ------------------------ BASE ------------------------

    The Sweet TypeTools base includes the following types:

    'string', 'object', 'number', 'array', 'symbol',
    'boolean', 'function', 'bigint', 'undefined', 'null'
*/

import type { BaseObject } from "./labels.js";

/**
 * Returns true if the value is a string.
 * 
 * @example
 * isString("hello")
 *  
 * // true
 */
export function isString(item: any): item is string {
    return typeof item === "string"
}

/**
 * Returns true if the value is a boolean.
 * 
 * @example
 * isBoolean(true)
 *  
 * // true
 */
export function isBoolean(item: any): item is boolean {
    return typeof item === 'boolean'
}

/**
 * Returns true if the value is a non-null, non-array object.
 *
 * Arrays return false because TypeTools treats `array`
 * as its own base type.
 *
 * @example
 * isObject({ a: 1 })
 * // true
 *
 * isObject([1, 2])
 * // false
 */
export function isObject(item: any): item is BaseObject {
    return item !== null && typeof item === "object" && !Array.isArray(item)
}

/**
 * Returns `true` if the value is a valid number.
 *
 * Unlike JavaScript's raw `typeof` behavior, this returns `false` for `NaN`
 * because `NaN` cannot be used as a valid numeric value.
 *
 * @example
 * isNumber(12)
 *  
 * // true
 * 
 * isNumber(0)
 *  
 * // true
 * 
 * isNumber(NaN)
 *  
 * // false
 */
export function isNumber(item: any): item is number {
    return typeof item === 'number' && !Number.isNaN(item)
}

/**
 * Returns true if the value is a bigint.
 * 
 * @example
 * isBigint(10n)
 *  
 * // true
 */
export function isBigint(item: any): item is bigint {
    return typeof item === 'bigint'
}

/**
 * Returns true if the value is `undefined`.
 * 
 * @example
 * isUndefined(undefined)
 *  
 * // true
 */
export function isUndefined(item: any): item is undefined {
    return typeof item === 'undefined'
}

/**
 * Returns `true` if the value is exactly `null`.
 *
 * Useful because JavaScript treats `null` as an object:
 * `typeof null === "object"`.
 *
 * @example
 * isNull(null)
 *  
 * // true
 * 
 * isNull(undefined)
 *  
 * // false
 * 
 * isNull({})  
 *  
 * // false
 */
export function isNull(item: any): item is null {
    return item === null
}

/**
 * Returns `true` if the value is an array.
 *
 * @example
 * isArray([1, 2])  
 * // true
 * 
 * isArray("hello")  
 * // false
 */
export function isArray(item: any): item is unknown[] {
    return Array.isArray(item)
}

/**
 * Returns `true` if the value is a function.
 *
 * Includes:
 * - standard functions
 * - arrow functions
 * - async functions
 * - class constructors
 * - generator functions
 *
 * Uses JavaScript's native:
 * `typeof item === "function"`
 *
 * @example
 * isFunction(function hello() {})
 * // true
 *
 * @example
 * isFunction(() => {})
 * // true
 *
 * @example
 * isFunction(async () => {})
 * // true
 *
 * @example
 * isFunction(class Test {})
 * // true
 *
 * @example
 * isFunction("hello")
 * // false
 *
 * @example
 * isFunction({})
 * // false
 */
export function isFunction(item: any): item is Function {
    return typeof item === 'function'
}

/**
 * Returns `true` if the value is a symbol.
 *
 * @example
 * isSymbol(Symbol("id"))
 * // true
 *
 * @example
 * isSymbol("symbol")
 * // false
 */
export function isSymbol(item: any): item is symbol {
    return typeof item === 'symbol'
}
