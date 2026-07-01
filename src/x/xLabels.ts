export type ArrayXLabel = 'array' | 'arrayX'

export type ObjectXLabel = ArrayXLabel | 'object' | 'objectX' | 'null'

export type NumberXLabel = 'number' | 'numberX'

export type SymbolXLabel = 'symbol' | 'symbolX'

export type StringXLabel = 'string' | 'stringX'

/**
 * X labels mark values that have the expected base type,
 * but are not considered usable by Sweet TypeTools.
 *
 * Examples:
 * - `stringX` → empty or whitespace-only string
 * - `numberX` → `0` or invalid number
 * - `arrayX` → empty array
 * - `objectX` → empty object
 * - `symbolX` → anonymous symbol
 */
export type XTypeLabel = 'stringX' | 'objectX' | 'arrayX' | 'numberX' | 'symbolX'

/**
 * List type for TypeTools `X` labels.
 */
export type XTypeLabels = XTypeLabel[]

/**
 * Runtime list of all supported TypeTools `X` type names.
 */
export const xTypeList: XTypeLabels = ['stringX', 'objectX', 'numberX', 'arrayX', 'symbolX']




/**
 * Base type labels that support X usability refinement.
 *
 * These types can be checked for meaningfulness/usability:
 * - `string` vs. `stringX`
 * - `object` vs. `objectX`
 * - `array` vs. `arrayX`
 * - `number` vs. `numberX`
 * - `symbol` vs. `symbolX`
 */
export type HasXTypeLabel =
    | 'string'
    | 'object'
    | 'array'
    | 'number'
    | 'symbol'



/**
 * Runtime list of *TypeTools* type names that support `X` refinement.
 */
export const hasXTypeList: HasXTypeLabel[] = [
    'string',
    'object',
    'array',
    'number',
    'symbol'
]

/**
 * List type for JavaScript labels that do not need X usability checking.
 */
export type JSFinalXLabel = 'bigint' | 'boolean' | 'function' | 'undefined'

/**
 * Runtime list of JavaScript labels that do not need X usability checking.
 */
export type JSFinalXLabels = JSFinalXLabel[]


/**
 * Runtime array of labels that need no further X checking after JS `typeof`
 */
export const jsFinalXLabelList: JSFinalXLabels = ['bigint', 'boolean', 'function', 'undefined']




/**
 * All type labels supported by the X layer.
 *
 * Includes:
 * - Base labels
 * - X usability labels
 */
export type XName = ObjectXLabel | StringXLabel | NumberXLabel | SymbolXLabel | JSFinalXLabel

/**
 * List type for all X-layer labels.
 */
export type XNames = XName[]

/**
 * Runtime list of all type names supported by the *TypeTools* `X` system.
 */
export const xNameList: XNames = ['array', 'arrayX', 'bigint', 'boolean', 'function', 'null', 'number', 'numberX', 'object', 'objectX', 'string', 'stringX', 'symbol', 'symbolX', 'undefined']

