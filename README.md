# Sweet *TypeTools*

*TypeTools* is **not a replacement for TypeScript**.

Instead, it is a small toolset for **expanding normal JavaScript runtime type detection** without overcomplicating it.

To put it simply: it is like `typeof`, but a lot smarter.

This **runtime-focused typing toolkit** extends JS/TS defaults to make type checks **clearer**, **safer**, and most importantly: **simpler**.

## Index

- [Installation](#installation)
- [Overview](#overview)
  - [The problem with JavaScript's `typeof`](#the-problem-with-javascripts-typeof)
  - [The TypeTools solution](#the-typetools-solution)
- [Features](#features-)
  - [Labels](#labels)
  - [Checks](#checks)
  - [Type finders](#type-finders)
  - [Adapters](#adapters)
  - [Which helper should I use?](#which-helper-should-i-use)

## Installation

In your project folder, run:

```bash
npm install sweet-type-tools
```

You can then import TypeTools helpers directly:

```js
import { sweetType } from "sweet-type-tools";

sweetType("12");
// "numeric"
```

## Overview

*TypeTools* **does not modify JS values**, change their classes, or add anything to their prototypes — nor does it try to validate full object shapes.

It has one main focus: to **improve runtime JS typing**.

### The problem with JavaScript's `typeof`

JavaScript's `typeof` is useful, but often too broad for everyday checks.

The following values, `x`, `y`, and `z`, are a good example of these shortcomings:

```js
let x = null;
// typeof x → "object"

let y = [];
// typeof y → "object"

let z = {};
// typeof z → "object"
```

Even though `x`, `y`, and `z` are very different values, JavaScript identifies all three as `"object"`.

In real code, that difference matters:

```js
y.concat("!");
// works, because y is an array

x.concat("!");
// fails, because x is null

z.concat("!");
// fails, because z is a plain object
```

Another good example is `NaN`:

```js
typeof NaN;
// "number" (...is a number you can't use as a number still a number?)
```

### The *TypeTools* solution

*TypeTools* comes with multiple small tools — **checkers**, **type finders**, and **adapters** — that help streamline runtime type checking.

These tools add **flexible layers of accuracy**, so you can choose the helper that best fits what you need to know.

It is designed to be:

- **Simple to use**

  No complicated abstractions or schema-style setup. TypeTools focuses on **small, practical tools** you can use directly in everyday runtime checks.

- **Low-friction and time-saving**

  TypeTools is easy to adopt. There is no need to learn a whole new system before using it. It builds on familiar JavaScript values, adding more precise runtime labels only where they are actually useful.

  The checks are small, easy to understand, well documented, and ready to use, so you can write type and value checks more quickly and with less repetition.

- **Flexible**

  TypeTools is separated into focused parts, including standalone checks, safe adapters, and type finders with different layers of precision. Runtime type and value checks can be **as broad or specific as you need them to be**.

## Features ✨

*TypeTools*' main goal is to make runtime typing easier, clearer, and more flexible.

Testing with `typeof` in JavaScript returns one of the following type labels:

```txt
"string", "number", "bigint", "boolean", "object", "function", "symbol", "undefined"
```

With *TypeTools*, you can still check normal JavaScript runtime types and get familiar results.

It **does not modify the underlying JS behavior**. Instead, it adds extra labels and layers of accuracy you can choose from *when you need to know more*.

These additional tools are separated into collections, grouped by what they help you do:

- **[Check value types](#checks)** with true/false helpers that cover:
  - standard JS-like type checks, such as `isString()`, `isBigInt()`, `isObject()`, or `isNumber()`
  - additional *TypeTools* labels and conditions, such as `isArray()`, `isNumeric()`, `isArrayX()`, or `isBooleanString()`
- **[Find type labels](#type-finders)** with helpers that work similarly to `typeof`, but with different layers of precision you can choose from according to your needs
- **[Adapt values](#adapters)** with small helpers that safely convert already type-like values

### Labels

*TypeTools* uses JavaScript runtime types as its foundation.

It does **not** change how `typeof` behaves. It simply gives you other ways to understand a value when `typeof` is not specific enough.

TypeTools labels are grouped by how much detail they add:

| Label group | What it adds | Example |
|---|---|---|
| **Base** | corrected runtime identity | `sweetBase([])` → `"array"` |
| **Precision** | semantic meaning | `sweetPrecise("12")` → `"numeric"` |
| **X** | usability / value quality | `sweetX([1])` → `"arrayX"` |
| **Sweet** | curated practical result | `sweetType("12")` → `"numeric"` |
| **Full** | complete available vocabulary | `sweetType("true", "full")` → `"booleanString"` |

The foundational TypeTools labels are called **base labels**.

You can get a value's base label with:

```js
sweetBase(value);
```

Base labels stay very close to normal JavaScript runtime types, with a few practical fixes:

| Value | `typeof value` | `sweetBase(value)` | Related check |
|---|---|---|---|
| `"hello"` | `"string"` | `"string"` | `isString("hello")` |
| `12` | `"number"` | `"number"` | `isNumber(12)` |
| `true` | `"boolean"` | `"boolean"` | `isBoolean(true)` |
| `{ hello: "world" }` | `"object"` | `"object"` | `isObject({ hello: "world" })` |
| `[1, 2]` | `"object"` | `"array"` | `isArray([1, 2])` |
| `null` | `"object"` | `"null"` | `isNull(null)` |
| `12n` | `"bigint"` | `"bigint"` | `isBigInt(12n)` |
| `Symbol()` | `"symbol"` | `"symbol"` | `isSymbol(Symbol())` |
| `() => {}` | `"function"` | `"function"` | `isFunction(() => {})` |
| `undefined` | `"undefined"` | `"undefined"` | `isUndefined(undefined)` |
| `NaN` | `"number"` | `"undefined"` | `isNumber(NaN)` → `false` |

A small note on `NaN`:

`NaN` is not literally `undefined`. TypeTools simply refuses to treat it as a valid number, so `sweetBase(NaN)` returns `"undefined"` instead of `"number"`.

## Checks

Checks are true/false helpers.

They are useful when you already know what you are looking for and only need a `true` or `false` answer.

A few examples:

```js
isString("hello");
// true

isString(12);
// false

isArray([1, 2]);
// true

isArray("hello");
// false
```

### Base checks

Base checks cover normal runtime type categories, with a few practical corrections.

For example, `isObject()` only returns `true` for non-null, non-array objects:

```js
isObject({ hello: "world" });
// true

isObject([]);
// false

isObject(null);
// false
```

And `isNumber()` only returns `true` for valid numbers:

```js
isNumber(12);
// true

isNumber(0);
// true

isNumber(NaN);
// false
```

Available base checks include:

```txt
isString()
isNumber()
isBoolean()
isBigInt()
isUndefined()
isNull()
isArray()
isObject()
isFunction()
isSymbol()
```

### Precision checks

Precision checks look for more specific meaning.

For example, a string can be more than just `"string"` — it may represent a number or a boolean value.

```js
isNumeric("12");
// true

isNumeric("1e3");
// true

isNumeric("hello");
// false

isBooleanString("true");
// true

isBooleanString(" FALSE ");
// true
```

Booleans can also be checked by exact value:

```js
isTrue(true);
// true

isTrue(false);
// false

isFalse(false);
// true
```

Available precision checks include:

```txt
isNumeric()
isBooleanString()
isTrue()
isFalse()
```

### X checks

`X` checks look for values that are usable or meaningful enough to work with directly.

For example:

```js
isStringX("hello");
// true

isStringX("");
// false

isStringX("   ");
// false

isArrayX([1, 2]);
// true

isArrayX([]);
// false

isObjectX({ hello: "world" });
// true

isObjectX({});
// false

isNumberX(12);
// true

isNumberX(0);
// false
```

Available `X` checks include:

```txt
isStringX()
isNumberX()
isArrayX()
isObjectX()
isSymbolX()
```

## Type finders

Type finders return a type label.

They work more like `typeof`, but with additional TypeTools labels available when you need more detail.

For example:

```js
typeof [];
// "object"

sweetBase([]);
// "array"
```

The main type finders are:

```txt
sweetBase()
sweetPrecise()
sweetX()
sweetType()
sweetType(value, "full")
```

### Finder comparison

| Finder | What it answers | Labels it can return | Example |
|---|---|---|---|
| `typeof value` | “What JavaScript runtime type is this?” | standard JS `typeof` labels only | `typeof []` → `"object"` |
| `sweetBase(value)` | “What kind of value is this?” | JS-like base labels, plus `"array"` and `"null"`; `NaN` resolves as `"undefined"` | `sweetBase([])` → `"array"` |
| `sweetPrecise(value)` | “Does this value have a more specific meaning?” | base labels plus precision labels like `"numeric"`, `"booleanString"`, `"true"`, and `"false"` | `sweetPrecise("12")` → `"numeric"` |
| `sweetX(value)` | “Is this value usable or non-empty?” | base labels plus `X` labels like `"stringX"`, `"arrayX"`, `"objectX"`, `"numberX"`, and `"symbolX"` | `sweetX([1])` → `"arrayX"` |
| `sweetType(value)` | “What is the best practical TypeTools label?” | curated result using the most useful labels from the available layers | `sweetType("12")` → `"numeric"` |
| `sweetType(value, "full")` | “What is the most complete available label?” | full available TypeTools vocabulary, including labels excluded from the default result | `sweetType("true", "full")` → `"booleanString"` |

### Base finder

`sweetBase()` is the closest finder to `typeof`.

It keeps normal JavaScript runtime labels where they make sense, but fixes common awkward cases:

- arrays return `"array"` instead of `"object"`
- `null` returns `"null"` instead of `"object"`
- `NaN` is not treated as a valid number

```js
sweetBase("hello");
// "string"

sweetBase(12);
// "number"

sweetBase([]);
// "array"

sweetBase(null);
// "null"

sweetBase(NaN);
// "undefined"
```

### Precision finder

`sweetPrecise()` adds meaning-based labels.

It can detect things like numeric strings, boolean strings, and exact boolean values.

```js
sweetPrecise("12");
// "numeric"

sweetPrecise("true");
// "booleanString"

sweetPrecise(true);
// "true"

sweetPrecise(false);
// "false"

sweetPrecise([1, 2]);
// "array"
```

### X finder

`sweetX()` adds usability-based labels.

It checks whether supported values are non-empty, meaningful, or usable enough to work with directly.

```js
sweetX("hello");
// "stringX"

sweetX("");
// "string"

sweetX([1, 2]);
// "arrayX"

sweetX([]);
// "array"

sweetX(12);
// "numberX"

sweetX(0);
// "number"
```

### Sweet finder

`sweetType()` is the main practical finder.

It combines the available layers into one curated result, designed for everyday use.

```js
sweetType("hello");
// "stringX"

sweetType("");
// "string"

sweetType("12");
// "numeric"

sweetType(true);
// "true"

sweetType([1, 2]);
// "arrayX"

sweetType([]);
// "array"
```

By default, `sweetType()` does not always return every possible label.

For example, `"true"` is technically a boolean-like string, but the default Sweet result treats it as a usable string:

```js
sweetType("true");
// "stringX"
```

If you want the complete available vocabulary, use `"full"` mode:

```js
sweetType("true", "full");
// "booleanString"
```

## Adapters

Adapters safely convert already type-like values into real values.

They are intentionally small. They are not broad coercion tools, and they are not meant to guess unclear input.

Current adapters include:

```txt
adaptBoolean()
adaptNumber()
```

### `adaptBoolean()`

`adaptBoolean()` converts boolean-like values into real booleans.

```js
adaptBoolean(true);
// true

adaptBoolean("true");
// true

adaptBoolean(1);
// true

adaptBoolean("1");
// true

adaptBoolean(false);
// false

adaptBoolean("false");
// false

adaptBoolean(0);
// false

adaptBoolean("0");
// false
```

### `adaptNumber()`

`adaptNumber()` converts number-like values into valid numbers.

It accepts actual numbers and numeric strings.

```js
adaptNumber(12);
// 12

adaptNumber("12");
// 12

adaptNumber("1e3");
// 1000

adaptNumber("hello");
// false

adaptNumber(NaN);
// false
```

## Which helper should I use?

| If you want to... | Use |
|---|---|
| get a corrected runtime type label | `sweetBase()` |
| get the most practical TypeTools label | `sweetType()` |
| get the complete available TypeTools label | `sweetType(value, "full")` |
| check whether a value matches something specific | `isString()`, `isNumeric()`, `isArrayX()`, etc. |
| check whether a value has semantic meaning | `sweetPrecise()` or precision checks |
| check whether a value is usable/non-empty | `sweetX()` or `X` checks |
| safely convert a type-like value | `adaptBoolean()` or `adaptNumber()` |
