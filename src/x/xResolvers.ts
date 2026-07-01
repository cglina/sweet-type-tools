import { isArray, isNull } from "../base/baseChecks.js";
import type { JSObject } from "../base/baseLabels.js";
import { arrayX, numberX, objectX, stringX, symbolX } from "./xChecks.js";
import { jsFinalXLabelList, type ArrayXLabel, type JSFinalXLabel, type NumberXLabel, type ObjectXLabel, type StringXLabel, type SymbolXLabel, type XName } from "./xLabels.js";


/**
 * Resolves an array into its X-layer label.
 *
 * Returns:
 * - `"array"` for usable, non-empty arrays
 * - `"arrayX"` for empty arrays
 */
export function arrayXType(item: any): ArrayXLabel {
    return arrayX(item) ? 'array' : 'arrayX'
}

/**
 * Resolves an object-like value into its X-layer label.
 *
 * Returns:
 * - `"objectX"` for empty objects
 * - `"array"` / `"arrayX"` for arrays
 * - `"null"` for null
 * - `"object"` for usable objects **with at least one own enumerable key**
 */
export function objectXType(item: JSObject): ObjectXLabel {
    if (isNull(item)) return 'null'
    if (isArray(item)) return arrayXType(item)
    return objectX(item) ? 'object' : 'objectX'
}

/**
 * Resolves a number into its X-layer label.
 *
 * Returns:
 * - `"number"` for usable non-zero numbers
 * - `"numberX"` for `0` or invalid numbers
 */
export function numberXType(item: number): NumberXLabel {
    return numberX(item) ? 'number' : 'numberX'
}

/**
 * Resolves a symbol into its X-layer type label.
 *
 * Returns:
 * - `"symbol"` for symbols with a description
 * - `"symbolX"` for anonymous symbols
 */
export function symbolXType(item: symbol): SymbolXLabel {
    return symbolX(item) ? 'symbol' : 'symbolX'
}

/**
 * Resolves a string into its X-layer type label.
 *
 * Returns:
 * - `"string"` for usable non-empty strings
 * - `"stringX"` for empty or whitespace-only strings
 */
export function stringXType(item: string): StringXLabel {
    return stringX(item) ? 'string' : 'stringX'
}

/**
 * Resolves any value into its X-layer label.
 *
 * Base tells you what a value is.
 * X tells you whether supported values are usable.
 *
 * Examples:
 * - `""` → `"stringX"`
 * - `"hello"` → `"string"`
 * - `0` → `"numberX"`
 * - `13` → `"number"`
 * - `[]` → `"arrayX"`
 * - `[1]` → `"array"`
 * - `{}` → `"objectX"`
 * - `{ a: 1 }` → `"object"`
 */
export function sweetX(item: any): XName {
    const jsType = typeof item
    if (jsFinalXLabelList.includes(jsType as JSFinalXLabel)) return jsType
    if (jsType === 'object') return objectXType(item)
    if (jsType === 'number') return numberXType(item)
    if (jsType === 'symbol') return symbolXType(item)
    if (jsType === 'string') return stringXType(item)
    return 'undefined'
}

/**
 * Checks whether a value resolves to a specific Sweet X-layer label.
 *
 * @example
 * sweetXCheck("", "stringX")
 * // true
 *
 * @example
 * sweetXCheck("hello", "string")
 * // true
 */
export function sweetXCheck(item: any, typeName: XName): boolean {
    return sweetX(item) === typeName
}