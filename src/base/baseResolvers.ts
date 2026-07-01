import { type BaseObjectLabel, type BaseTypeLabel, type JSObject } from "./baseLabels.js";


/**
 * Resolves the Sweet TypeTools base type of a value.
 *
 * Similar to JavaScript `typeof`, but with TypeTools fixes:
 * - arrays return `"array"` instead of `"object"`
 * - `null` returns `"null"` instead of `"object"`
 * - `NaN` returns `"undefined"` because it is not considered a valid number
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

/**
 * Resolves JavaScript object-like values into Sweet TypeTools base labels.
 *
 * JavaScript groups objects, arrays, and `null` under `typeof "object"`.
 * Sweet TypeTools separates them into:
 * - `"object"` — non-null, non-array object
 * - `"array"` — array
 * - `"null"` — null
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