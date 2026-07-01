/**
 * Value types accepted by numeric adaptation helpers.
 */
export type NumericTypes = string | number | bigint

/**
 * Return modes for adapters that can either preserve the original value
 * or return `false` when adaptation fails.
 */
export type AdapterResultMode = 'false' | 'value'

/**
 * Currently unused.
 */
export type AdaptedZero = 0 | false

/**
 * Return modes for numeric fallback cases.
 *
 * - `"value"` → return the original value
 * - `"false"` → return `false`
 * - `"zero"` → return `0`
 */
export type IfNotNumericReturn = AdapterResultMode | 'zero'

/**
 * Simple accept/reject settings for `isNumeric()` and `isNumericString()`.
 */
export interface NumericSettings {
    bigint?: boolean;
    nan?: boolean;
    zero?: boolean;
    empty?: boolean
}

/**
 * Default return settings used in `'isNumericString()'`.
 */
export const defaultNumericConfig: NumericSettings = {
    bigint: false,
    nan: false,
    zero: true,
    empty: false
}



/**
 * Full fallback configuration for numeric adaptation.
 *
 * Each special case controls its own return behavior.
 */
export interface NumericAdaptConfig {
    bigint: IfNotNumericReturn
    nan: IfNotNumericReturn
    zero: IfNotNumericReturn
    empty: IfNotNumericReturn
    textString: IfNotNumericReturn
}

/**
 * Default return settings for numeric adapters.
 */
export const defaultNumericAdaptConfig: NumericAdaptConfig = {
    bigint: "value",
    nan: "zero",
    empty: "zero",
    zero: "zero",
    textString: "value",
}

