import { isNumber, isObject, isString } from "../base/baseChecks.js";

/**
 * Returns `true` if the value is a usable string.
 *
 * A usable string must contain at least one non-whitespace character.
 */
export function stringX(item: any): item is string {
    return isString(item) && item.trim().length > 0
}


/**
 * Returns `true` if the value is a usable symbol.
 *
 * A usable symbol must have an explicit description.
 */
export function symbolX(item: any): item is symbol {
    return (
        typeof item === 'symbol' &&
        item.description !== undefined
    )
}


/**
 * Returns `true` if the value is a usable object **with at least one own enumerable key**.
 *
 * A usable object must be non-null and not an array.
 */
export function objectX(item: any): item is Record<string, any> {
    return isObject(item) && Object.keys(item).length > 0
}

/**
 * Returns `true` if the value is **a non-empty array**.
 */
export function arrayX(item: any): item is any[] {
    return Array.isArray(item) && item.length > 0
}

/**
 * Returns `true` if the value is a usable number greater than `0`.
 *
 * A usable number must be valid, not `NaN`.
 */
export function numberX(item: any): item is number {
    return isNumber(item) && item !== 0
}
