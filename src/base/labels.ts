/////////////// BASE-LEVEL TYPES & SMALL RESOLVERS THAT WORK AS THE FOUNDATION UPON WHICH SWEET TYPETOOLS IS BUILT

/**
 * Standard base type names supported by Sweet TypeTools.
 *
 * These mostly follow JavaScript `typeof` behavior, with a few additions:
 * - `array`: `object` & `array` are considered distinct types
 * - `null`: in JS, would return type `object`; Sweet TypeTools names `null` as a distinct type
 * - `NaN`: returns `number` in JS; considered `undefined` in *TypeTools*
 */
export type BaseTypeLabel =
    'string' | 'object' | 'number' | 'array' | 'symbol' | 'boolean' | 'function' | 'bigint' | 'undefined' | 'null'

/**
 * A list of standard base type labels.
 * 
 */
export type BaseTypeLabels = BaseTypeLabel[]


/**
 * Runtime list of all supported base type names.
 *
 * Useful for validation, iteration, dropdowns, docs generation,
 * and internal Sweet TypeTools dispatchers.
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

/** Types that are considered `'object'` using JS `typeof`*/
export type JSObject = object | any[] | null

/** Base labels that may result from values JS sees as typeof "object". */
export type BaseObjectLabel = 'object' | 'array' | 'null'

/** Describes a simple object */
export type SimpleObject = Record<string, any>

/** Property key types */
export type PropertyKey = string | symbol | number

/** Any non-null, non-array object, including objects with string, number, or symbol keys. */
export type BaseObject = object

/**
 * JS type names that remain unchanged regardless of other sweet label finders.
 */
export type BaseUnchangedLabel =
    | 'function'
    | 'null'
    | 'undefined'
    | 'bigint'

/**
 * Runtime list of JS type names that remain unchanged regardless of other sweet label finders.
 */
export const baseFinalList: BaseUnchangedLabel[] = [
    'function',
    'null',
    'undefined',
    'bigint'
]

