# fp-types

Functional programming types for TypeScript.
Provides most of OCaml's `Option`, `Result` and `Either` APIs.

<!--
TODO: 型×メソッドの ⭕ ❌ テーブル作成

1. Function Style

```ts
const fn = (): Option<string> => {
  const result = doSomething();

  if (!result) return Option.none();

  return Option.some(result);
};

const optionValue = fn();

console.log(Option.isSome(optionValue)); // true or false
```
-->

1. Class Style
   the Rust-like APIs

```ts
const fn = (): Option<string> => {
  const result = doSomething();

  if (!result) return new None();

  return new Some(result);
};

const optionValue = fn();

console.log(optionValue.isSome()); // true or false
```
