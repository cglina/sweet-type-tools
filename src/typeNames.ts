////////////// BASE TYPES ///////////////

import type { BaseTypeLabel } from "./base/labels.js";


export type SweetMode =
    | 'base'
    | 'precision'
    | 'x'
    | 'sweet'
    | 'full'

/////////////// PRECISION TYPES ///////////////

/**
 * Sweet precision type names used to narrow broad JavaScript/Sweet base types.
 *
 * Precision types provide more specific semantic distinctions
 * than standard JavaScript runtime categories.
 *
 * Includes:
 * - `true` — value is exactly `true`
 * - `false` — value is exactly `false`
 * - `numeric` — value is a numeric string
 * - `booleanString`- string representing a boolean value, like ('true', 'TRUE', 'False', etc)
 */

export type PrecisionTypeName =
    | 'true'
    | 'false'
    | 'numeric'
    | 'booleanString'

/**
 * A list of Sweet precision type names.
 */
export type PrecisionTypeNames = PrecisionTypeName[]

/**
 * Precise boolean result names.
 */
export type PreciseBooleanName = 'true' | 'false'

/**
 * Precise string result names.
 */
export type PreciseStringName = 'string' | 'numeric' | 'booleanString'

/**
 * Runtime list of all supported Sweet precision type names.
 */
export const precisionTypeList: PrecisionTypeNames = [
    'true',
    'false',
    'numeric',
    'booleanString'
]

/**
 * Base type names that do not require additional semantic refinement.
 *
 * Excludes:
 * - `boolean`, because it splits into `true` and `false`
 * - `string`, because strings may also be `numeric` or `booleanString`
 *
 * Useful as the stable "already precise" portion of Sweet runtime typing.
 */
export type PreciseBaseRoot =
    Exclude<BaseTypeName,
        | 'boolean'
        | 'string'
    >


export type PreciseBaseName =
    PrecisionTypeName | PreciseBaseRoot | 'string'

export const preciseBaseRootList: PreciseBaseRoot[] = ["null", "undefined", "function", "bigint", "symbol", "number", "array", "object"]



/////////////// FULL SWEET TYPES ///////////////

/**
 * All type names available to the complete Sweet type system.
 *
 * Combines:
 * - base type names
 * - precision type names
 * - X usability type names
 *
 * Useful for APIs that should support every available Sweet type.
 */
export type FullSweetTypeName =
    | BaseTypeName
    | PrecisionTypeName
    | XTypeName

/**
 * All-inclusive array of Sweet type names (aka: FlexTypeName[]) for maximum flexibility in usage.
 */
export type FullSweetTypeNames = FullSweetTypeName[]

/**
 * Runtime all-inclusive list of Sweet type names.
 */
export const fullSweetTypeList: FullSweetTypeNames = [
    'string', 'stringX', 'numeric', 'booleanString',
    'boolean', 'true', 'false',
    'number', 'numberX',
    'object', 'objectX',
    'array', 'arrayX',
    'symbol', 'symbolX',
    'function',
    'bigint',
    'null',
    'undefined']


/////////////// SWEET TYPES ///////////////

/**
 * Numeric values commonly used to represent booleans.
 *
 * - `1` means `true`
 * - `0` means `false`
 */
export type NumberBoolean = 1 | 0

/**
 * Numeric string values commonly used to represent booleans.
 *
 * - `"1"` means `true`
 * - `"0"` means `false`
 */
export type NumericBoolean = '1' | '0'

/**
 * Values accepted by `adaptBoolean()`.
 *
 * Includes:
 * - actual booleans
 * - precise boolean names: `"true"` / `"false"`
 * - numeric booleans: `1` / `0`
 * - numeric boolean strings: `"1"` / `"0"`
 */
export type BooleanLikeInput =
    | PreciseBooleanName
    | NumberBoolean
    | NumericBoolean
    | true
    | false

/**
* String values that TypeScript can recognize as number-like.
*
* Examples include:
* - `"12"`
* - `"-4.5"`
* - `"1e3"`
*
* Note:
* This is a compile-time helper. Runtime validation should still use
* `isNumeric()` or `adaptNumber()`.
*/
export type NumericString = `${number}`

/**
 * Values accepted by `adaptNumber()`.
 *
 * Includes:
 * - valid JavaScript numbers
 * - numeric strings recognized by TypeScript
 *
 * Note:
 * `NaN` cannot be excluded at the TypeScript type level,
 * so `adaptNumber()` handles it at runtime.
 */
export type NumberLikeInput =
    | number
    | NumericString


export type SweetTypeName = Exclude<PreciseBaseName, 'booleanString'> | XTypeName

export type SweetTypeNames = SweetTypeName[]

export const sweetTypeList: SweetTypeNames = [
    'string', 'stringX', 'numeric',
    'true', 'false',
    'number', 'numberX',
    'object', 'objectX',
    'array', 'arrayX',
    'symbol', 'symbolX',
    'function',
    'bigint',
    'null',
    'undefined']

