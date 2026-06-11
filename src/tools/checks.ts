import type { BaseObject } from "./typeNames.js";

/*

    ------------------------ BASE ------------------------

    The SweetTypes base/core includes the following types:

    'string', 'object', 'number', 'array', 'symbol',
    'boolean', 'function', 'bigint', 'undefined', 'null'



*/

/**
 * Returns true if the value is a string.
 * 
 * @example
 * isString("hello")
 *  
 * // true
 */
export function isString(item: any): item is string {
    return typeof item === "string"
}

/**
 * Returns true if the value is a boolean.
 * 
 * @example
 * isBoolean(true)
 *  
 * // true
 */
export function isBoolean(item: any): item is boolean {
    return typeof item === 'boolean'
}

/**
 * Returns true if the value is a non-null, non-array object.
 *
 * Arrays return false because Sweet Types treats `array`
 * as its own base type.
 *
 * @example
 * isObject({ a: 1 })
 * // true
 *
 * isObject([1, 2])
 * // false
 */
export function isObject(item: any): item is BaseObject {
    return item !== null && typeof item === "object" && !Array.isArray(item)
}

/**
 * Returns `true` if the value is a valid number.
 *
 * Unlike JavaScript's raw `typeof` behavior, this returns `false` for `NaN`
 * because `NaN` cannot be used as a valid numeric value.
 *
 * @example
 * isNumber(12)
 *  
 * // true
 * 
 * isNumber(0)
 *  
 * // true
 * 
 * isNumber(NaN)
 *  
 * // false
 */
export function isNumber(item: any): item is number {
    return typeof item === 'number' && !isNaN(item)
}

/**
 * Returns true if the value is a bigint.
 * 
 * @example
 * isBigInt(10n)
 *  
 * // true
 */
export function isBigInt(item: any): item is bigint {
    return typeof item === 'bigint'
}

/**
 * Returns true if the value is `undefined`.
 * 
 * @example
 * isUndefined(undefined)
 *  
 * // true
 */
export function isUndefined(item: any): item is undefined {
    return typeof item === 'undefined'
}

/**
 * Returns `true` if the value is exactly `null`.
 *
 * Useful because JavaScript treats `null` as an object:
 * `typeof null === "object"`.
 *
 * @example
 * isNull(null)
 *  
 * // true
 * 
 * isNull(undefined)
 *  
 * // false
 * 
 * isNull({})  
 *  
 * // false
 */
export function isNull(item: any): item is null {
    return item === null
}

/**
 * Returns `true` if the value is an array.
 *
 * @example
 * isArray([1, 2])  
 * // true
 * 
 * isArray("hello")  
 * // false
 */
export function isArray(item: any): item is any[] {
    return Array.isArray(item)
}

/**
 * Returns `true` if the value is a function.
 *
 * Includes:
 * - standard functions
 * - arrow functions
 * - async functions
 * - class constructors
 * - generator functions
 *
 * Uses JavaScript's native:
 * `typeof item === "function"`
 *
 * @example
 * isFunction(function hello() {})
 * // true
 *
 * @example
 * isFunction(() => {})
 * // true
 *
 * @example
 * isFunction(async () => {})
 * // true
 *
 * @example
 * isFunction(class Test {})
 * // true
 *
 * @example
 * isFunction("hello")
 * // false
 *
 * @example
 * isFunction({})
 * // false
 */
export function isFunction(item: any): item is (...args: any[]) => any {
    return typeof item === 'function'
}

/**
 * Returns `true` if the value is a symbol.
 *
 * @example
 * isSymbol(Symbol("id"))
 * // true
 *
 * @example
 * isSymbol("symbol")
 * // false
 */
export function isSymbol(item: any): item is symbol {
    return typeof item === 'symbol'
}


/*

    ------------------------ PRECISION ------------------------
    Precise SweetTypes can be used to narrow base Sweet/JS types. 
 
    Precision types provide more specific semantic distinctions
    than standard JavaScript runtime categories.
 
    Main distictions from base SweetTypes:
    
    - `numeric` — a string that represents a numeric value
    - `booleanString`- a string representation of a boolean value, like 'true' or 'false'
    - `true` — value is exactly `true`
    - `false` — value is exactly `false`
 */


/**
 * Returns `true` if a string is a valid numeric representation.
 *
 * Includes:
 * - integers
 * - floats
 * - scientific notation (`"1e3"`)
 * - strings with surrounding whitespace
 *
 * Excludes:
 * - empty strings
 * - whitespace-only strings
 * - non-numeric strings
 *
 * @example
 * isNumeric("12")
 * // true
 *
 * @example
 * isNumeric("  12  ")
 * // true
 *
 * @example
 * isNumeric("1e3")
 * // true
 *
 * @example
 * isNumeric("lala")
 * // false
 */
export function isNumeric(item: any): boolean {
    if (typeof item !== "string") return false

    const trimmed = item.trim()

    if (trimmed === "") return false

    return !Number.isNaN(Number(trimmed))
}

/**
 * Returns `true` if a string represents a boolean value.
 *
 * Accepted boolean strings:
 * - `"true"`
 * - `"false"`
 *
 * Matching is:
 * - case-insensitive
 * - whitespace-tolerant
 *
 * Excludes:
 * - empty strings
 * - partial matches
 * - non-boolean text
 *
 * @example
 * isBooleanString("true")
 * // true
 *
 * @example
 * isBooleanString(" FALSE ")
 * // true
 *
 * @example
 * isBooleanString("yes")
 * // false
 *
 * @example
 * isBooleanString("")
 * // false
 */
export function isBooleanString(item: any): boolean {
    if (typeof item !== "string") return false

    const trimmed = item.trim().toLowerCase()

    return trimmed === "true" || trimmed === "false"
}

/*

    ------------------------ X TYPES ------------------------

*/


/**
 * Returns `true` if the value is a non-empty usable string.
 *
 * A `stringX` means:
 * - the value is a string
 * - and it contains at least one non-whitespace character
 *
 * @example
 * isStringX("hello")  
 * // true
 * 
 * isStringX(" ")  
 * // false
 * 
 * isStringX("")  
 * // false
 */
export function isStringX(item: any): item is string {
    return isString(item) && item.trim().length > 0
}


/**
 * Returns `true` if the value is a symbol with a description.
 *
 * A `symbolX` means:
 * - the value is a symbol
 * - and it has an explicit description
 *
 * This makes the symbol easier to identify/debug than an anonymous `Symbol()`.
 *
 * Notes:
 * - `Symbol("id")` returns `true`
 * - `Symbol("")` also returns `true`, because the description was explicitly provided
 * - `Symbol()` returns `false`
 *
 * @example
 * isSymbolX(Symbol("userId"))  
 * // true
 * 
 * isSymbolX(Symbol(""))  
 * // true
 * 
 * isSymbolX(Symbol())  
 * // false
 * 
 * isSymbolX("symbol")  
 * // false
 */
export function isSymbolX(item: any): item is symbol {
    return (
        typeof item === 'symbol' &&
        item.description !== undefined
    )
}


/**
 * Returns `true` if the value is a non-empty object (arrays excluded).
 *
 * An `objectX` means:
 * - the value is a non-null object
 * - it is not an array
 * - and it has at least one own enumerable key
 *
 * @example
 * isObjectX({ a: 1 })  
 * // true
 * 
 * isObjectX({})  
 * // false
 * 
 * isObjectX([1, 2])  
 * // false
 * 
 * isObjectX(null)  
 * // false
 */
export function isObjectX(item: any): item is Record<string, any> {
    return isObject(item) && Object.keys(item).length > 0
}

/**
 * Returns `true` if the value is a non-empty array.
 *
 * An `arrayX` means:
 * - the value is an array
 * - and it has length > 0
 *
 * @example
 * isArrayX([1, 2])  
 * // true
 * 
 * isArrayX([])  
 * // false
 */
export function isArrayX(item: any): item is any[] {
    return Array.isArray(item) && item.length > 0
}

/**
 * Returns `true` if the value is a usable non-zero number.
 *
 * A `numberX` means:
 * - the value is a valid number
 * - it is not `NaN`
 * - and it is not `0`
 *
 * @example
 * isNumberX(12)  
 * // true
 * isNumberX(-5)  
 * // true
 * 
 * isNumberX(0)  
 * // false
 * 
 * isNumberX(NaN)  
 * // false
 */
export function isNumberX(item: any): item is number {
    return isNumber(item) && item !== 0
}
