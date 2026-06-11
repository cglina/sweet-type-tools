////////////// BASE TYPES ///////////////

/**
 * A single standard JavaScript/Sweet base type name.
 */
export type BaseTypeName =
    'string' | 'object' | 'number' | 'array' | 'symbol' | 'boolean' | 'function' | 'bigint' | 'undefined' | 'null'

/**
 * A list of standard base type names.
 */
export type BaseTypeNames = BaseTypeName[]

/**
 * Runtime list of all supported base type names.
 *
 * Useful for validation, iteration, dropdowns, docs generation,
 * and internal Sweet Type dispatchers.
 */
export const baseTypeList: BaseTypeNames = [
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

export type BaseObject = Record<string, any>

export type JSTypes = 'string' | 'object' | 'number' | 'symbol' | 'boolean' | 'function' | 'bigint' | 'undefined' 

export type JSObject = object | any[] | null
export type JSObjectTypeName = 'object' | 'array' | 'null'


export type BaseFinalName =
    | 'function'
    | 'null'
    | 'undefined'
    | 'bigint'

export const baseFinalList: BaseFinalName[] = [
    'function',
    'null',
    'undefined',
    'bigint'
]

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


/////////////// X TYPES ///////////////

/**
 * Strict/usable Sweet type names.
 *
 * `X` types represent values that pass stronger
 * usefulness or meaningfulness checks.
 *
 * Examples:
 * - `stringX` → non-empty string
 * - `numberX` → usable non-zero number
 * - `arrayX` → non-empty array
 * - `objectX` → non-empty object
 * - `symbolX` → symbol with a description
 */
export type XTypeName = 'stringX' | 'objectX' | 'arrayX' | 'numberX' | 'symbolX'

/**
 * A list of Sweet `X` type names.
 */
export type XTypeNames = XTypeName[]

/**
 * Runtime list of all supported Sweet `X` type names.
 */
export const xTypeList: XTypeNames = ['stringX', 'objectX', 'numberX', 'arrayX', 'symbolX']





/**
 * Sweet type names that support `X` usability refinement.
 *
 * These types can be upgraded into stricter/usable variants:
 *
 * - `string` → `stringX`
 * - `object` → `objectX`
 * - `array` → `arrayX`
 * - `number` → `numberX`
 * - `symbol` → `symbolX`
 *
 * Useful for internal Sweet type orchestration and `X`-layer logic.
 */
export type HasXTypeName =
    | 'string'
    | 'object'
    | 'array'
    | 'number'
    | 'symbol'

/**
 * Runtime list of Sweet type names that support `X` refinement.
 */
export const hasXTypeList: HasXTypeName[] = [
    'string',
    'object',
    'array',
    'number',
    'symbol'
]



/**
 * Type names supported by the Sweet `X` system.
 *
 * Includes:
 * - all Sweet base types
 * - all `X` usability types
 *
 * Excludes:
 * - precision-only semantic refinements such as:
 *   - `"numeric"`
 *   - `"booleanString"`
 *   - `"true"`
 *   - `"false"`
 *
 * Useful for APIs that focus on usability/value quality
 * rather than semantic interpretation.
 */
export type XBaseName = BaseTypeName | XTypeName

/**
 * A list of Sweet `X` system type names.
 */
export type XBaseNames = XBaseName[]

/**
 * Runtime list of all type names supported by the Sweet `X` system.
 */
export const xBaseNameList: XBaseNames = ['array', 'arrayX', 'bigint', 'boolean', 'function', 'null', 'number', 'numberX', 'object', 'objectX', 'string', 'stringX', 'symbol', 'symbolX', 'undefined']


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

