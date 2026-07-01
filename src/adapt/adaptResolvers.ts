import { isBooleanString } from "./adaptChecks.js";
import { defaultNumericConfig, defaultNumericAdaptConfig, type AdapterResultMode, type IfNotNumericReturn, type NumericSettings, type NumericAdaptConfig, type NumericTypes } from "./adaptLabels.js";

/**
 * Normalizes a string for value interpretation.
 *
 * Trims surrounding whitespace and converts letters to lowercase.
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


function resolveNumericAdaptConfig(settings?: Partial<NumericAdaptConfig>): NumericAdaptConfig {
    return { ...defaultNumericAdaptConfig, ...settings }

}

/**
 * Returns the fallback value for a failed numeric string adaptation.
 */
export function numericStringFallback(value: string, mode: IfNotNumericReturn): false | 0 | string {
    if (mode === "false") return false
    if (mode === "zero") return 0
    return value
}

/**
 * Attempts to interpret a string as a numeric value.
 *
 * Uses `NumericAdaptConfig` to decide what each special case should return:
 * - bigint-compatible strings
 * - `"NaN"`
 * - zero-like strings
 * - empty strings
 * - non-numeric text
 *
 * @example
 * ifNumericString("13")
 * // 13
 *
 * @example
 * ifNumericString("0")
 * // 0
 *
 * @example
 * ifNumericString("zero")
 * // 0
 *
 * @example
 * ifNumericString("NaN")
 * // 0
 *
 * @example
 * ifNumericString("abc")
 * // "abc"
 *
 * @example
 * ifNumericString("abc", { textString: "false" })
 * // false
 *
 * @example
 * ifNumericString("", { empty: "value" })
 * // ""
 *
 * @example
 * ifNumericString("9007199254740993", { bigint: "value" })
 * // 9007199254740993n
 */
export function ifNumericString(
    value: string,
    settings?: Partial<NumericAdaptConfig>
): number | bigint | false | string {
    const normalized = normalizeStringVal(value)
    const { bigint, nan, zero, empty, textString } =
        resolveNumericAdaptConfig(settings)

    if (normalized === "") {
        return numericStringFallback(value, empty)
    }
    if (normalized === "zero") {
        return numericStringFallback(value, zero)
    }

    if (normalized === "nan") {
        if (nan === "zero") return 0
        if (nan === "false") return false
        return NaN
    }

    const numericValue = Number(normalized)

    if (!Number.isNaN(numericValue)) {
        if (numericValue === 0) {
            return numericStringFallback(value, zero)
        }

        return numericValue
    }

    try {
        const asBigint = BigInt(normalized)

        if (bigint === "zero") return 0
        if (bigint === "false") return false
        return asBigint
    } catch {
        return numericStringFallback(value, textString)
    }
}

/**
 * Attempts to interpret a value as numeric.
 *
 * Accepts numbers, bigints, and strings.
 * Strings are delegated to `ifNumericString()`.
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
 * ifNumeric("abc")
 * // 0
 *
 * @example
 * ifNumeric("abc", { resultMode: "false" })
 * // false
 *
 * @example
 * ifNumeric("abc", { resultMode: "value" })
 * // "abc"
 *
 * @example
 * ifNumeric(0, { zero: false })
 * // 0
 *
 * @example
 * ifNumeric(13n, { bigint: false })
 * // false
 */
export function ifNumeric(value: NumericTypes, settings?: NumericAdaptConfig): number | bigint | false | string {
    const resolvedVal = typeof value === "string"
        ? ifNumericString(value, settings)
        : value

    if (resolvedVal === false) return false
    if (typeof resolvedVal === "string") return resolvedVal

    const { bigint, nan, zero } = resolveNumericAdaptConfig(settings) as Required<NumericAdaptConfig>

    if (typeof resolvedVal === "bigint") return bigint ? resolvedVal : false
    if (Number.isNaN(resolvedVal)) return nan ? resolvedVal : false
    if (resolvedVal === 0) return zero ? resolvedVal : false

    return resolvedVal
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
 * - `"false"` returns `false`
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
 * ifBooleanString("hello", "false")
 * // false
 */
export function ifBooleanString(value: string, returnMode: AdapterResultMode = 'value'): boolean | string {
    if (!isBooleanString(value)) return returnMode === 'false' ? false : value
    return normalizeStringVal(value) === "true"
}

