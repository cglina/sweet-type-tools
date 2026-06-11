import { baseTypeCheck, sweetBase } from "./base.js";
import { isArrayX, isNumberX, isObjectX, isStringX, isSymbolX } from "../tools/checks.js";
import { baseTypeList, hasXTypeList, type HasXTypeName, type XBaseName, type XTypeName } from "../tools/typeNames.js";


const xChecks: Record<XTypeName, (item: any) => boolean> = {
    stringX: isStringX,
    objectX: isObjectX,
    arrayX: isArrayX,
    numberX: isNumberX,
    symbolX: isSymbolX,
}

/**
 * Checks whether a value matches a Sweet `X` system type.
 *
 * The `X` system includes:
 * - all Sweet base types
 * - all `X` usability types
 *
 * Precision-only types such as `"numeric"`, `"booleanString"`,
 * `"true"`, and `"false"` are not handled here.
 */
export function xTypeCheck(
    item: any,
    typeName: XBaseName
): boolean {
    if (baseTypeList.includes(typeName as any)) {
        return baseTypeCheck(item, typeName as any)
    }

    const check = xChecks[typeName as XTypeName]

    return check ? check(item) : false
}


/**
 * Returns `true` if a value's base type does not support an `X` variant.
 *
 * Uses Sweet base typing via `sweetBase()`, not raw JavaScript `typeof`,
 * so arrays, objects, `null`, and invalid numbers follow Sweet Type rules.
 *
 * @param item - The value to analyze
 *
 * @returns `true` if the value is already final in the `X` system
 *
 * @example
 * isXBaseFinal(true)
 * // true
 *
 * @example
 * isXBaseFinal(null)
 * // true
 *
 * @example
 * isXBaseFinal("hello")
 * // false
 *
 * @example
 * isXBaseFinal([1, 2])
 * // false
 */
export function isXBaseFinal(item: any): boolean {
    return !hasXTypeList.includes(
        sweetBase(item) as HasXTypeName
    )
}


/**
 * Internal map used to resolve `X` system type names.
 *
 * Each key represents a base type that supports an `X` variant.
 * Each function returns either:
 * - the matching `X` type, if the value passes the usability check
 * - the original base type, if it does not
 */
const xTypeTests = {
    string: (item: string) => isStringX(item) ? 'stringX' : 'string',
    number: (item: number) => isNumberX(item) ? 'numberX' : 'number',
    array: (item: any[]) => isArrayX(item) ? 'arrayX' : 'array',
    object: (item: Record<string, any>) => isObjectX(item) ? 'objectX' : 'object',
    symbol: (item: symbol) => isSymbolX(item) ? 'symbolX' : 'symbol',
} as const

/**
 * Detects the most specific Sweet `X` system type for a value.
 *
 * The `X` system resolves values into:
 * - their base type, if no `X` refinement exists or applies
 * - their `X` type, if they pass the matching usability check
 *
 * Precision-only types such as `"numeric"`, `"booleanString"`,
 * `"true"`, and `"false"` are not used here.
 */
export function sweetX(item: any): XBaseName {
    const baseType = sweetBase(item)

    if (isXBaseFinal(item)) return baseType

    const test = xTypeTests[baseType as HasXTypeName]

    return test ? test(item as never) : baseType
}