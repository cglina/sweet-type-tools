import { isArray, isNumber, isObject, isString } from "../base/checks.js";
import { arrayX, numberX, objectX, stringX } from "../x/xChecks.js";
import { type NumericSettings, type NumericTypes } from "./adaptLabels.js";
import { ifNumeric, normalizeStringVal, numericConfigResolver } from "./adaptResolvers.js";


/**
 * Returns `true` if a string can be interpreted as numeric.
 *
 * Supports:
 * - regular numeric strings, such as `"13"` or `"13.5"`
 * - zero strings, depending on the `zero` setting
 * - `"NaN"`, depending on the `nan` setting
 * - bigint-compatible strings, depending on the `bigint` setting
 *
 * Empty strings and whitespace-only strings always return `false`.
 *
 * @example
 * isNumericString("13")
 * // true
 *
 * @example
 * isNumericString("0")
 * // true
 *
 * @example
 * isNumericString("NaN")
 * // false
 *
 * @example
 * isNumericString("NaN", { nan: true })
 * // true
 */
export function isNumericString(value: any, settings?: NumericSettings): boolean {
    if (typeof value !== "string") return false

    const trimmed = value.trim()
    if (trimmed === "") return false

    const { bigint, nan, zero } = numericConfigResolver(settings) as Required<NumericSettings>

    if (trimmed === "0") return zero
    if (trimmed.toLowerCase() === "nan") return nan

    const asNumber = Number(trimmed)

    if (!Number.isNaN(asNumber)) return true

    if (!bigint) return false

    try {
        BigInt(trimmed)
        return true
    } catch {
        return false
    }
}


export function isNumeric(value: NumericTypes, settings?: NumericSettings): boolean {
    return ifNumeric(value, settings) !== false
}

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
    if (isString(value)) return !stringX(value)
    if (typeof value === "number") return !numberX(value)
    if (isArray(value)) return !arrayX(value)
    if (isObject(value)) return !objectX(value)

    return false
}

/**
 * Returns `true` if a string can be interpreted as a boolean string.
 *
 * Accepted values:
 * - `"true"`
 * - `"false"`
 *
 * Matching is case-insensitive and ignores surrounding whitespace.
 *
 * @example
 * isBooleanString("true")
 * // true
 *
 * @example
 * isBooleanString("false")
 * // true
 *
 * @example
 * isBooleanString(" TRUE ")
 * // true
 *
 * @example
 * isBooleanString("yes")
 * // false
 *
 * @example
 * isBooleanString(true)
 * // false
 */
export function isBooleanString(value: any): boolean {
    if (typeof value !== 'string') return false
    const normalized = normalizeStringVal(value)
    return normalized === "true" || normalized === "false"
}