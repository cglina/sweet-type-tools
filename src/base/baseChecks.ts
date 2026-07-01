import type { BaseObject } from "./baseLabels.js";

/*
    ------------------------ BASE ------------------------

    The Sweet TypeTools base includes the following types:

    'string', 'object', 'number', 'array', 'symbol',
    'boolean', 'function', 'bigint', 'undefined', 'null'
*/

/**
 * Returns `true` if the value is a string.
 *
 * @example
 * isString("hello")
 * // true
 */
export function isString(item: any): item is string {
    return typeof item === "string"
}

/**
 * Returns `true` if the value is a boolean.
 *
 * @example
 * isBoolean(true)
 * // true
 */
export function isBoolean(item: any): item is boolean {
    return typeof item === 'boolean'
}

/**
 * Returns `true` if the value is a non-null, non-array object.
 *
 * Sweet TypeTools treats arrays and `null` as separate base types,
 * so both return `false`.
 *
 * @example
 * isObject({ a: 1 })
 * // true
 *
 * @example
 * isObject([1, 2])
 * // false
 *
 * @example
 * isObject(null)
 * // false
 */
export function isObject(item: any): item is BaseObject {
    return item !== null && typeof item === "object" && !Array.isArray(item)
}


/**
 * Returns `true` if the value is a valid number.
 *
 * Unlike JavaScript's raw `typeof` behavior, this returns `false`
 * for `NaN`, because `NaN` is not considered a valid TypeTools number.
 *
 * @example
 * isNumber(12)
 * // true
 *
 * @example
 * isNumber(0)
 * // true
 *
 * @example
 * isNumber(NaN)
 * // false
 */
export function isNumber(item: any): item is number {
    return typeof item === 'number' && !Number.isNaN(item)
}


/**
 * Returns `true` if the value is a bigint.
 *
 * @example
 * isBigint(10n)
 * // true
 */
export function isBigint(item: any): item is bigint {
    return typeof item === 'bigint'
}


/**
 * Returns `true` if the value is `undefined`.
 *
 * @example
 * isUndefined(undefined)
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
 * // true
 *
 * @example
 * isNull(undefined)
 * // false
 *
 * @example
 * isNull({})
 * // false
 */
export function isNull(item: any): item is null {
    return item === null
}

/**
 * Returns `true` if the value is an array.
 *
 * Sweet TypeTools treats arrays as their own base type,
 * separate from `object`.
 *
 * @example
 * isArray([1, 2])
 * // true
 *
 * @example
 * isArray("hello")
 * // false
 */
export function isArray(item: any): item is unknown[] {
    return Array.isArray(item)
}

/**
 * Returns `true` if the value is a function.
 *
 * Includes standard functions, arrow functions, async functions,
 * class constructors, and generator functions.
 *
 * @example
 * isFunction(() => {})
 * // true
 *
 * @example
 * isFunction(class User {})
 * // true
 *
 * @example
 * isFunction("hello")
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
