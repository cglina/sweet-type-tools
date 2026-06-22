import { isBooleanString } from "./adaptChecks.js";
import { defaultNumericConfig, type AdapterResultMode, type NumericSettings, type NumericTypes } from "./adaptLabels.js";

/**
 * Merges custom numeric settings with the default numeric configuration.
 *
 * Any setting not provided will fall back to `defaultNumericConfig`.
 *
 * @example
 * numericConfigResolver()
 * // { bigint: true, nan: false, zero: true }
 *
 * @example
 * numericConfigResolver({ nan: true })
 * // { bigint: true, nan: true, zero: true }
 */
export function numericConfigResolver(settings?: NumericSettings): NumericSettings {
    return { ...defaultNumericConfig, ...settings }
}



/**
 * Converts a numeric string into its numeric value when possible.
 *
 * Returns:
 * - a `number` for regular numeric strings
 * - a `bigint` for bigint-compatible strings, when `bigint` is enabled
 * - `NaN` for `"NaN"`, when `nan` is enabled
 * - `false` when the value cannot be interpreted as numeric
 *
 * Respects `NumericSettings`:
 * - `zero`: allows or rejects values that resolve to `0`
 * - `nan`: allows or rejects `"NaN"`
 * - `bigint`: allows or rejects bigint-compatible strings
 *
 * @example
 * ifNumericString("13")
 * // 13
 *
 * @example
 * ifNumericString("13.5")
 * // 13.5
 *
 * @example
 * ifNumericString("0", { zero: false })
 * // false
 *
 * @example
 * ifNumericString("9007199254740993")
 * // 9007199254740993
 *
 * @example
 * ifNumericString("NaN", { nan: true })
 * // NaN
 */
export function ifNumericString(value: any, settings?: NumericSettings): number | bigint | false {
    if (typeof value !== "string") return false

    const trimmed = normalizeStringVal(value)
    if (trimmed === "") return false

    const { bigint, nan, zero } = numericConfigResolver(settings) as Required<NumericSettings>

    if (trimmed === "0") return zero ? 0 : false
    if (trimmed === "nan") return nan ? NaN : false

    const asNumber = Number(trimmed)

    if (!Number.isNaN(asNumber)) {
        if (asNumber === 0 && !zero) return false
        return asNumber
    }

    if (!bigint) return false

    try {
        return BigInt(trimmed)
    } catch {
        return false
    }
}




/**
 * Converts a numeric-like value into a usable numeric value when possible.
 *
 * Accepts (respecting to provided settings when provided):
 * - numbers
 * - bigints
 * - numeric strings
 *
 * **Returns:**
 * - a `number` for valid number values or numeric strings
 * - a `bigint` for bigint values or bigint-compatible strings
 * - `false` when the value is not allowed by the current settings
 *
 * Respects `NumericSettings` (if provided)
 * - `zero`: allows or rejects `0`
 * - `nan`: allows or rejects `NaN`
 * - `bigint`: allows or rejects `bigint` values
 *
 * **When absent, settings default to:** `{ bigint: false, nan: false, zero: true }`
 *     
 * @example
 * ifNumeric(13)
 * // 13
 *
 * @example
 * ifNumeric("13")
 * // 13
 *
 * @example
 * ifNumeric(0, { zero: false })
 * // false
 *
 * @example
 * ifNumeric(13n, { bigint: false })
 * // false
 */
export function ifNumeric(value: NumericTypes, settings?: NumericSettings): number | bigint | false {
    const resolvedVal = typeof value === "string"
        ? ifNumericString(value, settings)
        : value

    if (resolvedVal === false) return false

    const { bigint, nan, zero } = numericConfigResolver(settings) as Required<NumericSettings>

    if (typeof resolvedVal === "bigint") return bigint ? resolvedVal : false
    if (Number.isNaN(resolvedVal)) return nan ? resolvedVal : false
    if (resolvedVal === 0) return zero ? resolvedVal : false

    return resolvedVal
}

/** Trims and converts any uppercase letters to lowercase.
 * 
 * @example
 * normalizeStringVal("  HELLO  ")
 * // "hello"
 * 
 * @example
 * normalizeStringVal("12345&6789")
 * // "12345&6789"
 */
export function normalizeStringVal(value: string): string {
    return value.trim().toLowerCase()
}


/**
 * Converts a boolean-like string into a boolean.
 *
 * Accepted boolean strings:
 * - `"true"`
 * - `"false"`
 *
 * Matching is case-insensitive and ignores surrounding whitespace.
 *
 * If the string is not boolean-like, the return value depends on `returnMode`:
 * - `"value"` returns the original string
 * - `"boolean"` returns `false`
 *
 * @example
 * ifBooleanString("true")
 * // true
 *
 * @example
 * ifBooleanString("false")
 * // false
 *
 * @example
 * ifBooleanString(" TRUE ")
 * // true
 *
 * @example
 * ifBooleanString("hello")
 * // "hello"
 *
 * @example
 * ifBooleanString("hello", "boolean")
 * // false
 */
export function ifBooleanString(value: string, returnMode: AdapterResultMode = 'value'): boolean | string {
    if (!isBooleanString(value)) return returnMode === 'boolean' ? false : value
    return normalizeStringVal(value) === "true"
}