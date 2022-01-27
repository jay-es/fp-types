# fp-types

Functional programming types for TypeScript.
Provides most of OCaml's `Option`, `Result` and `Either` APIs.

### Examples

1. Functional Style

```ts
const fn = (): Option<string> => {
  return Math.random() > 0.5 ? Option.some("foo") : Option.none();
};

const res = fn();

console.log(Option.isSome(res)); // true or false
console.log(Option.value(res, "bar")); // "foo" or "bar"
```

2. OOP Style (Rust-like API)

```ts
const fn = (): Option<string> => {
  return Math.random() > 0.5 ? Option.some("foo") : Option.none();
};

const res = fn();

console.log(res.isSome()); // true or false
console.log(res.value("bar")); // "foo" or "bar"
```
