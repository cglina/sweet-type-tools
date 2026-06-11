import { isBooleanString, isNumeric } from "../tools/checks.js";
import { preciseBaseRootList, type BaseTypeName, type PreciseBaseName, type PreciseBaseRoot } from "../tools/typeNames.js";
import { sweetBase } from "./base.js";

/**
 * Distinguishes between Sweet string categories:
 * - `"numeric"` → valid numeric string
 * - `"booleanString"` → strings representing a boolean value, such as 'false', 'TRUE', 'True', etc.
 * - `"string"` → regular string
 *
 * @param item - The string to analyze
 *
 * @returns The most precise matching string type
 *
 * @example
 * preciseStringType("12")
 * // "numeric"
 *
 * @example
 * preciseStringType("true")
 * // "booleanString"
 *
 * @example
 * preciseStringType("hello")
 * // "string"
 */
export function preciseStringType(
    item: string
): 'numeric' | 'booleanString' | 'string' {
    if (isNumeric(item)) return 'numeric'
    if (isBooleanString(item)) return 'booleanString'
    return 'string'
}



/**
 * Detects the most precise Sweet boolean type.
 *
 * Booleans are refined into:
 * - `"true"` → value is exactly `true`
 * - `"false"` → value is exactly `false`
 *
 * This is used internally by Sweet precision type checks
 * to distinguish exact boolean states.
 *
 * @param item - The boolean value to analyze
 *
 * @returns The precise boolean type name
 *
 * @example
 * preciseBoolean(true)
 * // "true"
 *
 * @example
 * preciseBoolean(false)
 * // "false"
 */
export function preciseBoolean(
    item: boolean
): 'true' | 'false' {
    return item === true ? 'true' : 'false'
}





/**
 * Checks whether a value matches a precise Sweet base type.
 *
 * This is the semantic refinement layer above `baseTypeCheck`.
 *
 * Behavior:
 * - precise base roots are checked directly
 * - strings are refined into `"string"`, `"numeric"`, or `"booleanString"`
 * - booleans are refined into `"true"` or `"false"`
 *
 * @param item - The value to check
 * @param typeName - The precise Sweet base type name to validate against
 *
 * @returns `true` if the value matches the requested precise base type
 */
export function precisionTypeCheck(
    item: any,
    typeName: PreciseBaseName
): boolean {
    return sweetPrecise(item) === typeName
}



/**
 * Returns `true` if a base type is already considered semantically precise.
 *
 * Precise base roots do not require additional refinement through
 * `PrecisionTypeName` checks.
 *
 * Examples:
 * - `"object"` is already precise
 * - `"array"` is already precise
 * - `"number"` is already precise
 *
 * Non-precise roots:
 * - `"boolean"` → may become `"true"` or `"false"`
 * - `"string"` → may become `"numeric"` or `"booleanString"`
 */
function isPreciseBaseRoot(
    typeName: BaseTypeName
): typeName is PreciseBaseRoot {
    return preciseBaseRootList.includes(typeName as PreciseBaseRoot)
}


/**
 * Detects the most precise Sweet base type for a value.
 *
 * This sits above `sweetBase()` and applies semantic refinements:
 * - strings become `"numeric"` if they are valid numeric strings
 * - strings become `"booleanString"` if they represent boolean values
 * - booleans become `"true"` or `"false"`
 * - already precise base roots are returned unchanged
 *
 * The final fallback should not normally be reached; it exists as a
 * TypeScript-safe exhaustiveness fallback.
 *
 * @param item - The value to analyze
 *
 * @returns The most precise matching Sweet base type name
 *
 * @example
 * sweetPrecise("12")
 * // "numeric"
 *
 * @example
 * sweetPrecise("hello")
 * // "string"
 *
 * @example
 * sweetPrecise(true)
 * // "true"
 *
 * @example
 * sweetPrecise([1, 2])
 * // "array"
 */
export function sweetPrecise(item: any): PreciseBaseName {
    const baseType = sweetBase(item)

    if (isPreciseBaseRoot(baseType)) return baseType
    if (baseType === 'string') return preciseStringType(item)
    if (baseType === 'boolean') return preciseBoolean(item)

    return 'undefined'
}