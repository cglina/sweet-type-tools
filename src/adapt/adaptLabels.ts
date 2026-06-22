export type NumericTypes = string | number | bigint

export interface NumericSettings {
    bigint?: boolean;
    nan?: boolean;
    zero?: boolean;
}

export const defaultNumericConfig: NumericSettings = {
    bigint: false,
    nan: false,
    zero: true
}

export type AdapterResultMode = 'boolean' | 'value'

/**
 * Settings used to guide the valueAdapter()'s behaviour. 
 * 
 * 
 */
export interface ValueAdapterSettings {
    booleanString?: boolean;
    numericString?: boolean;

}