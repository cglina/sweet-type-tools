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