# Sweet *TypeTools*

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