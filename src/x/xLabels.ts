export type ArrayXLabel = 'array' | 'arrayX'

export type ObjectXLabel = ArrayXLabel | 'object' | 'objectX' | 'null'

export type NumberXLabel = 'number' | 'numberX'

export type SymbolXLabel = 'symbol' | 'symbolX'

export type StringXLabel = 'string' | 'stringX'

/**
 * `X` types represent values that do not pass stronger
 * usefulness or meaningfulness checks.
 *
 * Examples:
 * - `stringX` → empty string
 * - `numberX` → number is either NaN or 0
 * - `arrayX` → empty array
 * - `objectX` → empty object
 * - `symbolX` → symbol without a description
 */
export type XTypeLabel = 'stringX' | 'objectX' | 'arrayX' | 'numberX' | 'symbolX'

/**
 * A list of TypeTools `X` type names.
 */
export type XTypeLabels = XTypeLabel[]

/**
 * Runtime list of all supported TypeTools `X` type names.
 */
export const xTypeList: XTypeLabels = ['stringX', 'objectX', 'numberX', 'arrayX', 'symbolX']




/**
 * *TypeTools* type names that support `X` usability refinement.
 *
 * These types can be checked for meaningfulness/usability:
 *
 * - `string` vs. `stringX`
 * - `object` vs. `objectX`
 * - `array` vs. `arrayX`
 * - `number` vs. `numberX`
 * - `symbol` vs. `symbolX`
 *
 * Useful for internal TypeTools type orchestration and `X`-layer logic.
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
 * Labels that need no further X checking after JS `typeof`
 */
export type JSFinalXLabel = 'bigint' | 'boolean' | 'function' | 'undefined'

/**
 * Array of labels that need no further X checking after JS `typeof`
 */
export type JSFinalXLabels = JSFinalXLabel[]


/**
 * Runtime array of labels that need no further X checking after JS `typeof`
 */
export const jsFinalXLabelList: JSFinalXLabels = ['bigint', 'boolean', 'function', 'undefined']




/**
 * All type names supported by the *TypeTools* `X` layer.
 *
 * Includes:
 * - all base types
 * - all `X` usability types
 *
 * Useful for APIs that focus on usability/value quality
 * rather than semantic interpretation.
 */
export type XName = ObjectXLabel | StringXLabel | NumberXLabel | SymbolXLabel | JSFinalXLabel

/**
 * A list of *TypeTools* `X` system type names.
 */
export type XNames = XName[]

/**
 * Runtime list of all type names supported by the *TypeTools* `X` system.
 */
export const xNameList: XNames = ['array', 'arrayX', 'bigint', 'boolean', 'function', 'null', 'number', 'numberX', 'object', 'objectX', 'string', 'stringX', 'symbol', 'symbolX', 'undefined']

