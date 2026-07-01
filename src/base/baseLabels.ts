/////////////// BASE-LEVEL TYPES & SMALL RESOLVERS THAT WORK AS THE FOUNDATION UPON WHICH SWEET TYPETOOLS IS BUILT

/**
 * Standard base type names supported by Sweet TypeTools.
 *
 * These mostly follow JavaScript `typeof` behavior, with a few TypeTools fixes:
 * - `array`: arrays are treated as their own base type instead of `object`
 * - `null`: `null` is treated as its own base type instead of `object`
 * - `NaN`: treated as `undefined`, because it is not considered a valid number
 */
export type BaseTypeLabel =
    'string' | 'object' | 'number' | 'array' | 'symbol' | 'boolean' | 'function' | 'bigint' | 'undefined' | 'null'

/**
 * List type for standard base type labels.
 */
export type BaseTypeLabels = BaseTypeLabel[]


/**
 * Runtime list of all supported base type labels.
 *
 * Useful for validation, iteration, docs generation,
 * dropdowns, and internal TypeTools dispatchers.
 */
export const baseLabelList: BaseTypeLabels = [
    'string',
    'object',
    'array',
    'number',
    'symbol',
    'boolean',
    'function',
    'bigint',
    'undefined',
    'null',
]

/**
 * Values that JavaScript sees as `typeof "object"`.
 *
 * Sweet TypeTools separates these into:
 * - `object`
 * - `array`
 * - `null`
 */
export type JSObject = object | any[] | null

/**
 * Base labels that may result from values JavaScript sees as `typeof "object"`.
 */
export type BaseObjectLabel = 'object' | 'array' | 'null'

/**
 * Object with string keys and arbitrary values.
 */
export type SimpleObject = Record<string, any>

/**
 * Supported JavaScript property key types.
 */
export type PropertyKey = string | symbol | number

/**
 * Any non-null, non-array object.
 *
 * Includes objects with string, number, or symbol keys.
 */
export type BaseObject = object

/**
 * JavaScript type names that do not need special TypeTools handling.
 *
 * These labels can be returned directly because TypeTools does not split
 * or reinterpret them at the Base layer.
 */
export type BaseUnchangedLabel =
    | 'function'
    | 'null'
    | 'undefined'
    | 'bigint'

/**
 * Runtime list of JavaScript type names that do not need special TypeTools handling.
 */
export const baseFinalList: BaseUnchangedLabel[] = [
    'function',
    'null',
    'undefined',
    'bigint'
]

