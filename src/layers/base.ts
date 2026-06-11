import { isNumber } from "../tools/checks.js";
import type { BaseTypeName, JSObject, JSObjectTypeName } from "../tools/typeNames.js";

/**
 * Detects the Sweet object-like base type of a JavaScript object value.
 *
 * Separates JavaScript's broad `"object"` category into:
 * - `"object"` — non-null, non-array object
 * - `"array"` — array
 * - `"null"` — null
 *
 * @param item - A JavaScript object-like value to inspect
 *
 * @returns The Sweet object-like base type name
 *
 * @example
 * baseObjectType({ a: 1 })
 * // "object"
 *
 * @example
 * baseObjectType([1, 2])
 * // "array"
 *
 * @example
 * baseObjectType(null)
 * // "null"
 */
export function baseObjectType(item: JSObject): JSObjectTypeName {
    return item === null ? 'null' : Array.isArray(item) ? 'array' : 'object'
}

/**
 * Checks whether a value matches a given Sweet base type name.
 *
 * Similar to JavaScript `typeof`, but with Sweet base-type fixes:
 * - arrays match `"array"` instead of `"object"`
 * - `null` matches `"null"` instead of `"object"`
 * - non-array objects match `"object"`
 * - `number` only matches valid numbers, so `NaN` returns `false`
 *
 * @param item - The value to check
 * @param typeName - The expected Sweet base type name
 *
 * @returns `true` if the value matches the requested Sweet base type
 *
 * @example
 * baseTypeCheck("hello", "string")
 * // true
 *
 * @example
 * baseTypeCheck([1, 2], "array")
 * // true
 *
 * @example
 * baseTypeCheck([1, 2], "object")
 * // false
 *
 * @example
 * baseTypeCheck(null, "null")
 * // true
 *
 * @example
 * baseTypeCheck(NaN, "number")
 * // false
 */
export function baseTypeCheck(
    item: any,
    typeName: BaseTypeName
): boolean {
    if (item === null) return typeName === 'null'
    if (Array.isArray(item)) return typeName === 'array'
    if (typeName === 'number') return isNumber(item)

    return typeName === typeof item
}

/**
 * Detects the Sweet base type of a value.
 *
 * Similar to JavaScript `typeof`, but with Sweet base-type fixes:
 * - arrays return `"array"` instead of `"object"`
 * - `null` returns `"null"` instead of `"object"`
 * - non-array objects return `"object"`
 * - `NaN` returns `"undefined"` because it is not considered
 *   a valid Sweet number
 *
 * @param item - The value to inspect
 *
 * @returns The detected Sweet base type name
 *
 * @example
 * sweetBase("hello")
 * // "string"
 *
 * @example
 * sweetBase([1, 2])
 * // "array"
 *
 * @example
 * sweetBase(null)
 * // "null"
 *
 * @example
 * sweetBase(NaN)
 * // "undefined"
 */
export function sweetBase(item: any): BaseTypeName {
    if (item === null) return 'null'
    if (Array.isArray(item)) return 'array'
    if (typeof item === 'number') return isNaN(item) ? 'undefined' : 'number'
    return typeof item as BaseTypeName
}
