
/**
 * Used in `'isNumeric()'` and `'ifNumeric()'` to narrow input types for `value` param.
 */
export type NumericTypes = string | number | bigint

/**
 * Used in `'isBooleanString()'` settings to determine return type.
 */
export type AdapterResultMode = 'false' | 'value'

/**
 * Currently unused.
 */
export type AdaptedZero = 0 | false

/**
 * Extends 'AdapterResultMode' to include 'zero' as a return option.
 * 
 * Used in input settings & default values for `'ifNumericString()'`.
 */
export type IfNotNumericReturn = AdapterResultMode | 'zero'

/**
 * Used in `'isNumericString()'` and `'isNumeric()'` to determine return settings.
 */
export interface NumericSettings {
    bigint?: boolean;
    nan?: boolean;
    zero?: boolean;
    empty?: boolean
}

/**
 * Used in `'isNumericString()'` to determine return settings.
 */
export const defaultNumericConfig: NumericSettings = {
    bigint: false,
    nan: false,
    zero: true,
    empty: false
}



export interface NumericAdaptConfig {
    bigint: IfNotNumericReturn
    nan: IfNotNumericReturn
    zero: IfNotNumericReturn
    empty: IfNotNumericReturn
    textString: IfNotNumericReturn
}

export const defaultNumericAdaptConfig: NumericAdaptConfig = {
    bigint: "value",
    nan: "zero",
    empty: "zero",
    zero: "zero",
    textString: "value",
}

