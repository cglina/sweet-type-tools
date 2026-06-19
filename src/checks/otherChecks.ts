import { isArrayX, isNumberX, isObjectX, isStringX } from "../tools/labelChecks.js";
import { isArray, isNumber, isObject, isString } from "../base/baseChecks.js";

/**
 * Returns `true` if the value is `null` or `undefined`.
 *
 * This follows the standard JavaScript meaning of "nullish":
 * - `null`
 * - `undefined`
 *
 * Unlike `isEmptyVal` or `isClearValue`, this does not treat empty strings,
 * empty arrays, empty objects, `0`, or `false` as nullish.
 *
 * @example
 * isNullish(null) // true
 *
 * @example
 * isNullish(undefined) // true
 *
 * @example
 * isNullish("") // false
 *
 * @example
 * isNullish(0) // false
 *
 * @example
 * isNullish(false) // false
 *
 * @example
 * isNullish([]) // false
 */
export function isNullish(item: any): boolean {
    return item === null || item === undefined
}

/**
 * Returns `true` if a value is considered empty by Sweet value rules.
 *
 * Empty values include:
 * - `null`
 * - `undefined`
 * - empty or whitespace-only strings
 * - `0`
 * - empty arrays
 * - empty (non-array) objects
 *
 * Values like `false`, functions, symbols, and bigints are not treated as empty.
 *
 * @example
 * isEmptyVal("") // true
 * isEmptyVal("   ") // true
 * isEmptyVal("hello") // false
 *
 * @example
 * isEmptyVal(0) // true
 * isEmptyVal(5) // false
 *
 * @example
 * isEmptyVal([]) // true
 * isEmptyVal([1]) // false
 *
 * @example
 * isEmptyVal({}) // true
 * isEmptyVal({ a: 1 }) // false
 *
 * @example
 * isEmptyVal(null) // true
 * isEmptyVal(undefined) // true
 * isEmptyVal(false) // false
 */
export function isEmptyVal(value: any): boolean {
    if (isNullish(value)) return true
    if (isString(value)) return !isStringX(value)
    if (isNumber(value)) return !isNumberX(value)
    if (isArray(value)) return !isArrayX(value)
    if (isObject(value)) return !isObjectX(value)

    return false
}