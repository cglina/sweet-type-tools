import { sweetType } from "../base/baseResolvers.js";
import { arrayX, numberX, objectX, symbolX } from "../x/xChecks.js";
import { ifNumericString, normalizeStringVal } from "./adaptResolvers.js";

/**
 * Converts any value into a boolean using Sweet TypeTools value rules.
 *
 * This is broader than JavaScript's native `Boolean()` behavior.
 * Empty, zero-like, or non-meaningful values return `false`.
 * Meaningful values return `true`.
 *
 * @example
 * toBoolean("hello")
 * // true
 *
 * @example
 * toBoolean("")
 * // false
 *
 * @example
 * toBoolean("false")
 * // false
 *
 * @example
 * toBoolean([1])
 * // true
 *
 * @example
 * toBoolean([])
 * // false
 */
export function toBoolean(value: any): boolean {
    const baseType = sweetType(value)

    if (baseType === "boolean") return value
    if (baseType === "undefined" || baseType === "null") return false

    if (baseType === "string") {
        const normStr = normalizeStringVal(value)
        return normStr !== "" && normStr !== "0" && normStr !== "false"
    }

    if (baseType === "array") return arrayX(value)
    if (baseType === "object") return objectX(value)
    if (baseType === "number") return numberX(value)

    if (baseType === "bigint") return value !== 0n
    if (baseType === "symbol") return symbolX(value)
    if (baseType === "function") return true

    return false
}


/**
 * Converts any value into a number using Sweet TypeTools value rules.
 *
 * This always returns a concrete number.
 *
 * Conversion rules:
 * - booleans become `1` or `0`
 * - `null` and `undefined` become `0`
 * - arrays become their length
 * - objects become their number of own enumerable keys
 * - numbers return unchanged
 * - bigints are converted with `Number()`
 * - symbols become `1` when described, otherwise `0`
 * - functions become `1`
 * - numeric strings return their numeric value
 * - non-numeric strings return their character count
 *
 * @example
 * toNumber("42")
 * // 42
 *
 * @example
 * toNumber("hello")
 * // 5
 *
 * @example
 * toNumber([1, 2, 3])
 * // 3
 *
 * @example
 * toNumber({ a: 1, b: 2 })
 * // 2
 *
 * @example
 * toNumber(null)
 * // 0
 */
export function toNumber(value: any): number {
    const baseType = sweetType(value)

    if (baseType === "boolean") return value ? 1 : 0
    if (baseType === "undefined" || baseType === "null") return 0
    if (baseType === "array") return value.length
    if (baseType === "object") return Object.keys(value).length
    if (baseType === "number") return value
    if (baseType === "symbol") return symbolX(value) ? 1 : 0

    if (baseType === "bigint") return Number(value)
    if (baseType === "function") return 1

    if (baseType === "string") {
        const numericString = ifNumericString(value, {
            zero: "zero",
            empty: "zero",
            nan: "zero",
            bigint: "zero",
            textString: "value",
        })

        return typeof numericString === 'number' ? numericString : value.length 
    }

    return 0
}