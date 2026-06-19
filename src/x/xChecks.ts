import { isNumber, isObject, isString } from "../base/checks.js";

/**
 * Returns `true` if the value is a non-empty usable string.
 *
 * `stringX()` checks that:
 * - the value is a string
 * - and it contains at least one non-whitespace character
 *
 * @example
 * stringX("hello")  
 * // true
 * 
 * stringX(" ")  
 * // false
 * 
 * stringX("")  
 * // false
 */
export function stringX(item: any): item is string {
    return isString(item) && item.trim().length > 0
}


/**
 * Returns `true` if the value is a symbol with a description.
 *
 * `symbolX()` checks that:
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
 * symbolX(Symbol("userId"))  
 * // true
 * 
 * symbolX(Symbol(""))  
 * // true
 * 
 * symbolX(Symbol())  
 * // false
 * 
 * symbolX("symbol")  
 * // false
 */
export function symbolX(item: any): item is symbol {
    return (
        typeof item === 'symbol' &&
        item.description !== undefined
    )
}


/**
 * Returns `true` if the value is a non-empty object (arrays excluded).
 *
 * `objectX()` checks that:
 * - the value is a non-null object
 * - it is not an array
 * - and it has at least one own enumerable key
 *
 * @example
 * objectX({ a: 1 })  
 * // true
 * 
 * objectX({})  
 * // false
 * 
 * objectX([1, 2])  
 * // false
 * 
 * objectX(null)  
 * // false
 */
export function objectX(item: any): item is Record<string, any> {
    return isObject(item) && Object.keys(item).length > 0
}

/**
 * Returns `true` if the value is a non-empty array.
 *
 * `arrayX()` checks that:
 * - the value is an array
 * - and it has length > 0
 *
 * @example
 * arrayX([1, 2])  
 * // true
 * 
 * arrayX([])  
 * // false
 */
export function arrayX(item: any): item is any[] {
    return Array.isArray(item) && item.length > 0
}

/**
 * Returns `true` if the value is a usable non-zero number.
 *
 * `numberX()` checks that:
 * - the value is a valid number
 * - it is not `NaN`
 * - and it is not `0`
 *
 * @example
 * numberX(12)  
 * // true
 * numberX(-5)  
 * // true
 * 
 * numberX(0)  
 * // false
 * 
 * numberX(NaN)  
 * // false
 */
export function numberX(item: any): item is number {
    return isNumber(item) && item !== 0
}
