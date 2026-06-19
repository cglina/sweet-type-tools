import type { BooleanLikeInput, NumberLikeInput } from "./typeNames.js";

/**
 * Adapts a boolean-like value into an actual boolean.
 *
 * @example
 * adaptBoolean("true")
 * // true
 *
 * @example
 * adaptBoolean("0")
 * // false
 *
 * @example
 * adaptBoolean(1)
 * // true
 */
export function adaptBoolean(
    item: BooleanLikeInput
): boolean {
    return item === true || item === 'true' || item === 1 || item === '1'
}

/**
 * Adapts a number-like value into a valid Sweet number.
 *
 * Accepts:
 * - numbers
 * - numeric strings
 *
 * Rejects:
 * - `NaN`
 * - strings that cannot be converted into valid numbers
 *
 * @param item - The number-like value to adapt
 *
 * @returns The adapted number, or `false` if the value cannot become a valid Sweet number
 *
 * @example
 * adaptNumber("12")
 * // 12
 *
 * @example
 * adaptNumber("1e3")
 * // 1000
 *
 * @example
 * adaptNumber(NaN)
 * // false
 */
export function adaptNumber(
    item: NumberLikeInput
): number | false {
    const nr = typeof item === 'number'
        ? item
        : Number(item)

    return Number.isNaN(nr)
        ? false
        : nr
}