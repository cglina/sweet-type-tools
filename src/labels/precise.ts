import { isBooleanString, isNumeric } from "../checks/preciseChecks.js";
import type { BaseTypeLabel } from "../base/labels.js";

/**
 * More specific TypeTools names used to narrow common JavaScript edge cases.
 *
 * Includes:
 * - `true` — JS type is boolean and value is `true`
 * - `false` — JS type is boolean and value is `false`
 * - `numeric` — JS type is string and value is a numeric string (ex: '12')
 * - `booleanString` - JS type is string and value is 'true' or 'false'
 */

export type PreciseType = 'true' | 'false' | 'numeric' | 'booleanString'

export type PreciseTypes = PreciseType[]

/** JS types that might be changed by precision checking */
export type UnpreciseJS = 'boolean' | 'string'

/** Runtime list of JS types that might be changed by precision checking */
export const unpreciseList: UnpreciseJS[] = ['boolean', 'string']

/** All 'base' labels that don't need further precise checking */
export type PreciseBase = Exclude<BaseTypeLabel, UnpreciseJS>

/** All combined base & precise labels that can be returned after a precise type check */
export type PreciseLabel = PreciseType | PreciseBase | 'string'

/** All available distinctions for precise strings:
 * 
 * - `"numeric"` → valid numeric string
 * - `"booleanString"` → strings representing a boolean value, such as 'false', 'TRUE', 'True', etc.
 * - `"string"` → regular string
 * 
 */
export type PreciseString = 'booleanString' | 'numeric' | 'string'

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
 * preciseStringLabel("12")
 * // "numeric"
 *
 * @example
 * preciseStringLabel("true")
 * // "booleanString"
 *
 * @example
 * preciseStringLabel("hello")
 * // "string"
 */
export function preciseStringLabel(
    item: string
): PreciseString {
    if (isNumeric(item)) return 'numeric'
    if (isBooleanString(item)) return 'booleanString'
    return 'string'
}