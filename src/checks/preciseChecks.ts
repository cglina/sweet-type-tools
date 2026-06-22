

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