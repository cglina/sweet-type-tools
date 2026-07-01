import { type BaseObjectLabel, type BaseTypeLabel, type JSObject } from "./baseLabels.js";


/**
 * Detects the TypeTools basic type of a value.
 *
 * Similar to JavaScript `typeof`, but with TypeTools fixes:
 * - arrays return `"array"` instead of `"object"`
 * - `null` returns `"null"` instead of `"object"`
 * - non-array objects return `"object"`
 * - `NaN` returns `"undefined"` because it is not considered
 *   a valid TypeTools number
 *
 * @param item - The value to inspect
 *
 * @returns The detected TypeTools basic type label 
 * 
 * @example
 * sweetType("hello")
 * // "string"
 *
 * @example
 * sweetType([1, 2])
 * // "array"
 *
 * @example
 * sweetType(null)
 * // "null"
 *
 * @example
 * sweetType(NaN)
 * // "undefined"
 */
export function sweetType(item: any): BaseTypeLabel {
    if (typeof item === 'object') return baseObjectLabel(item)
    if (typeof item === 'number') return Number.isNaN(item) ? 'undefined' : 'number'
    return typeof item as BaseTypeLabel
}

/////////////// OBJECT RESOLVERS ///////////////

/**
 * Detects the TypeTools object-like basic type
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
 * baseObjectLabel({ a: 1 })
 * // "object"
 *
 * @example
 * baseObjectLabel([1, 2])
 * // "array"
 *
 * @example
 * baseObjectLabel(null)
 * // "null"
 */
export function baseObjectLabel(item: JSObject): BaseObjectLabel {
    return item === null ? 'null' : Array.isArray(item) ? 'array' : 'object'
}