import { sweetType } from "../base/baseResolvers.js";
import { arrayX, numberX, objectX, symbolX } from "../x/xChecks.js";
import { ifNumericString, normalizeStringVal } from "./adaptResolvers.js";

/**
 * Adapts any value into a boolean using Sweet TypeTools value rules.
 *
 * This is broader than JavaScript's native `Boolean()` behavior.
 * It treats empty or unusable values as `false`, and meaningful values as `true`.
 *
 * **Returns `false` for:**
 * - `false`
 * - `null`
 * - `undefined`
 * - empty or whitespace-only strings
 * - `"0"`
 * - `"false"`
 * - empty arrays
 * - empty objects
 * - `0`
 * - `NaN`
 * - `0n`
 * - anonymous symbols
 *
 * **Returns `true` for:**
 * - `true`
 * - non-empty strings
 * - non-empty arrays
 * - non-empty objects
 * - non-zero valid numbers
 * - non-zero bigints
 * - symbols with a description
 * - functions
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
 * Adapts any value into a number using Sweet TypeTools value rules.
 *
 * This adapter attempts to produce a meaningful numeric representation
 * for any supported value.
 *
 * Conversion rules:
 * - `true` → `1`
 * - `false` → `0`
 * - `null` / `undefined` → `0`
 * - arrays → array length
 * - objects → number of own enumerable properties
 * - numbers → unchanged
 * - bigints → converted using `Number()`
 * - symbols → `1` if described, otherwise `0`
 * - functions → `1`
 * - strings → adapted using `ifNumericString()`
 *
 * String adaptation:
 * - numeric strings return their numeric value
 * - `"NaN"` returns `NaN`
 * - zero-like strings (such as `"0"` and `"zero"`) return `0`
 * - non-numeric strings return `0`
 * - bigint-compatible strings return `0`
 *
 * @example
 * toNumber(true)
 * // 1
 *
 * @example
 * toNumber(false)
 * // 0
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
 * toNumber("42")
 * // 42
 *
 * @example
 * toNumber("zero")
 * // 0
 *
 * @example
 * toNumber("hello")
 * // 0
 *
 * @example
 * toNumber(Symbol("id"))
 * // 1
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
            textString: "zero",
        })

        return typeof numericString === "number" ? numericString : 0
    }

    return 0
}