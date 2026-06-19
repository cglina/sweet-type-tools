import { baseTypeList, precisionTypeList, xTypeList, type BaseTypeName, type FullSweetTypeName, type PreciseBaseName, type SweetTypeName, type XBaseName } from "./tools/typeNames.js";
import { baseTypeCheck } from "./sweetBase.js";
import { precisionTypeCheck, sweetPrecise } from "./precision/precision.js";
import { sweetX, xTypeCheck } from "./x/x.js";




export type SweetTypeMode = "sweet" | "full";

/**
 * Detects the TypeTools of a value.
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
 * @returns The detected TypeTools name.
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