import { isBooleanString } from "./adaptChecks.js";
import { defaultNumericConfig, defaultNumericAdaptConfig, type AdapterResultMode, type IfNotNumericReturn, type NumericSettings, type NumericAdaptConfig, type NumericTypes } from "./adaptLabels.js";

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


function numericAdaptConfigResolver(settings?: NumericAdaptConfig): NumericAdaptConfig {
    return { ...defaultNumericAdaptConfig, ...settings }

}

function NumericAdaptConfigResolver(settings?: Partial<NumericAdaptConfig>): NumericAdaptConfig {
    return { ...defaultNumericAdaptConfig, ...settings }

}

export function numericStringFallback(value: string, mode: IfNotNumericReturn): false | 0 | string {
    if (mode === "false") return false
    if (mode === "zero") return 0
    return value
}

/**
 * Adapts a string into a numeric value when possible.
 *
 * This adapter treats each special string case independently through
 * `NumericAdaptConfig`.
 *
 * **Returns:**
 * - a `number` for regular numeric strings
 * - a `bigint` for bigint-compatible strings, depending on `bigint`
 * - `NaN`, `0`, `false`, or the original value for `"NaN"`, depending on `nan`
 * - `0`, `false`, or the original value for zero-like strings, depending on `zero`
 * - `0`, `false`, or the original value for empty strings, depending on `empty`
 * - `0`, `false`, or the original value for non-numeric text, depending on `textString`
 *
 * Special string cases:
 * - `""` / whitespace-only strings are controlled by `empty`
 * - `"zero"` and numeric zero strings like `"0"` are controlled by `zero`
 * - `"nan"` is controlled by `nan`
 * - non-numeric text is controlled by `textString`
 *
 * `IfNotNumericReturn` modes:
 * - `"zero"` → returns `0`
 * - `"false"` → returns `false`
 * - `"value"` → returns the original string
 *
 * **Default config:**
 * `{ bigint: "value", nan: "zero", empty: "zero", zero: "zero", textString: "value" }`
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
        NumericAdaptConfigResolver(settings)

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

    const asNumber = Number(normalized)

    if (!Number.isNaN(asNumber)) {
        if (asNumber === 0) {
            return numericStringFallback(value, zero)
        }

        return asNumber
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
 * Converts a numeric-like value when possible.
 *
 * Accepts:
 * - numbers
 * - bigints
 * - numeric strings
 *
 * **Returns:**
 * - a `number` for valid number values or numeric strings
 * - a `bigint` for bigint values or bigint-compatible strings
 * - the original string when string adaptation fails and `resultMode` is `"value"`
 * - `false` when the value is rejected and `resultMode` is `"false"`
 * - `0` when the value is rejected and `resultMode` is `"zero"`
 *
 * Respects `NumericAdaptConfig`:
 * - `zero`: allows or rejects values that resolve to `0`
 * - `nan`: allows or rejects `NaN`
 * - `bigint`: allows or rejects `bigint` values
 * - `empty`: allows or rejects empty / whitespace-only strings
 * - `resultMode`: controls what is returned when string adaptation fails
 *
 * **When absent, settings default to:**
 * `{ bigint: false, nan: false, zero: true, empty: false, resultMode: "zero" }`
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

    const { bigint, nan, zero } = numericAdaptConfigResolver(settings) as Required<NumericAdaptConfig>

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

