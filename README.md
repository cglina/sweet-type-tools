# Sweet *TypeTools*

*Sweet TypeTools* is a **lightweight runtime type library** for JavaScript and TypeScript.

It extends JavaScript's native `typeof` with **more practical runtime type detection** ([base](#base)), **value refinement** ([x](#x)), and **flexible value interpretation** ([adapt](#adapt)).

## Contents
- [Installation](#installation)
- [Philosophy](#philosophy)
- [Base](#base)
- [X](#x)
- [Adapt](#adapt)
- [Quick reference](#quick-reference)

## Installation


## Base

`sweetType()` is the foundation of **Sweet TypeTools**.

Its purpose is simple:

> Return a more accurate runtime type than JavaScript's `typeof`.

It behaves almost exactly like JavaScript's native `typeof`, but fixes a few long-standing quirks that often make runtime type checks more confusing than they need to be.

For example, JavaScript reports all of these as `"object"`:

```js
typeof [];
// "object"

typeof {};
// "object"

typeof null;
// "object"
```

While technically correct, those values represent very different things in practice.

`sweetType()` separates them into their own runtime types:

```js
sweetType([]);
// "array"

sweetType({});
// "object"

sweetType(null);
// "null"
```

It also treats `NaN` differently.

Although JavaScript considers `NaN` a `"number"`, it cannot be used as a valid numeric value. Sweet TypeTools therefore treats it as an invalid number:

```js
typeof NaN;
// "number"

sweetType(NaN);
// "undefined"
```

Everything else stays familiar:

```js
sweetType("hello");
// "string"

sweetType(42);
// "number"

sweetType(true);
// "boolean"

sweetType(Symbol());
// "symbol"

sweetType(() => {});
// "function"
```

In short, `sweetType()` is simply a cleaner, more practical version of `typeof`.

Internally, this functionality is known as the **Base** layer. It provides the foundation on which the rest of Sweet TypeTools is built.

### Base labels

The Base layer recognizes the following runtime type labels:

| Value | `typeof` | `sweetType()` |
| :--- | :--- | :--- |
| `"hello"` | `"string"` | `"string"` |
| `42` | `"number"` | `"number"` |
| `true` | `"boolean"` | `"boolean"` |
| `[]` | `"object"` | `"array"` |
| `{}` | `"object"` | `"object"` |
| `null` | `"object"` | `"null"` |
| `10n` | `"bigint"` | `"bigint"` |
| `Symbol()` | `"symbol"` | `"symbol"` |
| `() => {}` | `"function"` | `"function"` |
| `undefined` | `"undefined"` | `"undefined"` |
| `NaN` | `"number"` | `"undefined"` |

### Base checks

Every Base type has a matching helper function.

```ts
isString()
isNumber()
isBoolean()
isObject()
isArray()
isNull()
isUndefined()
isFunction()
isSymbol()
isBigint()
```

These helpers follow the same rules as `sweetType()`.

For example:

```js
isObject({});
// true

isObject([]);
// false

isObject(null);
// false

isNumber(12);
// true

isNumber(NaN);
// false
```

## X

The **X** layer builds on the Base layer.

While `sweetType()` tells you **what a value is**, `sweetX()` tells you whether that value has additional characteristics that may deserve special handling.

For example, an empty string is still a string, and an empty array is still an array. However, in many applications these values carry a different meaning than their non-empty counterparts.

The X layer distinguishes those cases by introducing a small set of **X labels**.

```js
sweetType("");
// "string"

sweetX("");
// "stringX"
```

```js
sweetType([]);
// "array"

sweetX([]);
// "arrayX"
```

```js
sweetType({});
// "object"

sweetX({});
// "objectX"
```

```js
sweetType(0);
// "number"

sweetX(0);
// "numberX"
```

Rather than replacing the Base layer, **X refines it**.

This makes it easy to distinguish values that are technically valid, but may require different handling in your application.

### X labels

The X layer currently recognizes the following refined labels:

| Base | X |
| :--- | :--- |
| `"string"` | `"stringX"` → empty or whitespace-only strings |
| `"array"` | `"arrayX"` → empty arrays |
| `"object"` | `"objectX"` → empty objects |
| `"number"` | `"numberX"` → `0` or `NaN` |
| `"symbol"` | `"symbolX"` → anonymous symbols |

All other Base labels remain unchanged.

### X checks

Every X label has a matching helper function.

```ts
stringX()
arrayX()
objectX()
numberX()
symbolX()
```

Each helper returns `true` when the value satisfies the corresponding X refinement.

For example:

```js
stringX("hello");
// true

stringX("");
// false

arrayX([1, 2]);
// true

arrayX([]);
// false

numberX(42);
// true

numberX(0);
// false
```

### X resolvers

Like the Base layer, X also provides runtime type resolvers.

```ts
sweetX()
sweetXCheck()
```

These functions return or compare X-layer labels in the same way that `sweetType()` and `sweetTypeCheck()` work for the Base layer.

## Adapt

The **Adapt** layer builds on both Base and X.

While the previous layers focus on **identifying** and **refining** values, Adapt focuses on **interpreting** and **converting** them.

Many values can be interpreted in more than one way.

For example:

- `"42"` can be interpreted as the number `42`
- `"TRUE"` can be interpreted as the boolean `true`
- `"  hello  "` may simply need normalization before further processing

The Adapt layer provides small, composable helpers that make these interpretations predictable and reusable.

### Adapt function families

Adapt functions follow three naming patterns:

```ts
is...
```

Returns whether a value **can be interpreted** as something.

```ts
isNumeric("42")
// true

isBooleanString("TRUE")
// true
```

---

```ts
if...
```

Attempts the interpretation and returns the adapted value.

If adaptation is not possible, the return value depends on the adapter's configuration.

```ts
ifNumeric("42")
// 42

ifNumeric("hello")
// "hello"

ifBooleanString("TRUE")
// true

ifBooleanString("hello")
// "hello"
```

---

```ts
to...
```

Converts any value into a concrete target type using Sweet TypeTools value rules.

Unlike the `if...` adapters, these always return the target type.

```ts
toNumber("42")
// 42

toNumber("hello")
// 5

toBoolean([])
// false

toBoolean([1, 2])
// true
```

### Adapt pipeline

Most Adapt helpers are intentionally built on top of one another.

Rather than duplicating logic, each helper performs a single step before delegating to the next one.

```text
normalize
    ↓
is
    ↓
if
    ↓
to
```

For example, numeric adaptation follows this flow:

```text
normalizeStringVal()
        ↓
isNumericString()
        ↓
ifNumericString()
        ↓
ifNumeric()
        ↓
toNumber()
```

This keeps the library consistent, easier to maintain, and easier to extend as new adapters are added.

### Current adapters

The Adapt layer currently includes:

#### Helpers

```ts
normalizeStringVal()
```

#### Checks

```ts
isNumeric()
isNumericString()
isBooleanString()
isNullish()
isEmptyVal()
```

#### Adapters

```ts
ifNumeric()
ifNumericString()
ifBooleanString()
```

#### Type converters

```ts
toNumber()
toBoolean()
```
