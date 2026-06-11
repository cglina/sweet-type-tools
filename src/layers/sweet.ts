import { baseTypeList, precisionTypeList, xTypeList, type BaseTypeName, type FullSweetTypeName, type PreciseBaseName, type SweetTypeName, type XBaseName } from "../tools/typeNames.js";
import { baseTypeCheck } from "./base.js";
import { precisionTypeCheck, sweetPrecise } from "./precision.js";
import { sweetX, xTypeCheck } from "./x.js";


/**
 * Checks whether a value matches a named Sweet type.
 *
 * Unlike `sweetType()`, this does not choose one best label.
 * It checks the specific type name provided by the user.
 *
 * Supports the full Sweet vocabulary:
 * - base types, such as `"string"`, `"number"`, `"array"`
 * - precision types, such as `"numeric"`, `"booleanString"`, `"true"`, `"false"`
 * - X types, such as `"stringX"`, `"numberX"`, `"arrayX"`
 *
 * This means a value may match more than one Sweet type.
 *
 * @param item - The value to check
 * @param typeName - The Sweet type name to check against
 *
 * @returns `true` if the value matches the requested Sweet type
 *
 * @example
 * sweetTypeCheck("hello", "string")
 * // true
 *
 * @example
 * sweetTypeCheck("hello", "stringX")
 * // true
 *
 * @example
 * sweetTypeCheck("12", "numeric")
 * // true
 *
 * @example
 * sweetTypeCheck("12", "stringX")
 * // true
 *
 * @example
 * sweetTypeCheck("true", "booleanString")
 * // true
 *
 * @example
 * sweetTypeCheck(true, "true")
 * // true
 *
 * @example
 * sweetTypeCheck([], "arrayX")
 * // false
 */
export function sweetTypeCheck(
    item: any,
    typeName: FullSweetTypeName
): boolean {
    if (baseTypeList.includes(typeName as any)) {
        return baseTypeCheck(item, typeName as BaseTypeName)
    }

    if (precisionTypeList.includes(typeName as any)) {
        return precisionTypeCheck(item, typeName as PreciseBaseName)
    }

    if (xTypeList.includes(typeName as any)) {
        return xTypeCheck(item, typeName as XBaseName)
    }

    return false
}


export type SweetTypeMode = "sweet" | "full";

/**
 * Detects the Sweet type of a value.
 *
 * By default, this uses the curated Sweet system:
 * - booleans become `"true"` or `"false"`
 * - numeric strings become `"numeric"`
 * - usable values become their `X` type when available
 * - `"booleanString"` is intentionally excluded from default Sweet results
 *
 * Use `mode: "full"` to access the complete Sweet vocabulary,
 * including `"booleanString"`.
 *
 * @param item - The value to analyze
 * @param mode - Optional detection mode. Defaults to `"sweet"`.
 *
 * @returns The detected Sweet type name.
 *
 * @example
 * sweetType("hello")
 * // "stringX"
 *
 * @example
 * sweetType("")
 * // "string"
 *
 * @example
 * sweetType("12")
 * // "numeric"
 *
 * @example
 * sweetType("true")
 * // "stringX"
 *
 * @example
 * sweetType("true", "full")
 * // "booleanString"
 *
 * @example
 * sweetType(true)
 * // "true"
 *
 * @example
 * sweetType([1, 2])
 * // "arrayX"
 *
 * @example
 * sweetType([])
 * // "array"
 */
export function sweetType(
    item: any
): SweetTypeName;


export function sweetType(
    item: any,
    mode: "sweet"
): SweetTypeName;

export function sweetType(
    item: any,
    mode: "full"
): FullSweetTypeName;

export function sweetType(
    item: any,
    mode: SweetTypeMode = "sweet"
): SweetTypeName | FullSweetTypeName {
    const preciseType = sweetPrecise(item);

    if (mode === "full") {
        if (preciseType !== "string") return preciseType;

        return sweetX(item);
    }

    if (preciseType === "true" || preciseType === "false") {
        return preciseType;
    }

    if (preciseType === "numeric") {
        return preciseType;
    }

    if (preciseType === "booleanString") {
        return sweetX(item) as SweetTypeName;
    }

    return sweetX(item) as SweetTypeName;
}