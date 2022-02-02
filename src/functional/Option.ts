import { compareFn, equalFn } from "~/shared/helpers";
import { Result } from ".";

const _type = Symbol();
const _value = Symbol();

export type Some<T> = {
  [_type]: "Some";
  [_value]: T;
};

export type None = {
  [_type]: "None";
};

export type Option<T> = Some<T> | None;

export const some = <T>(value: T): Option<T> => ({
  [_type]: "Some",
  [_value]: value,
});

export const none = (): Option<never> => ({
  [_type]: "None",
});

export const isSome = <T>(option: Option<T>): option is Some<T> =>
  option[_type] === "Some";

export const isNone = <T>(option: Option<T>): option is None =>
  option[_type] === "None";

export const value = <T>(option: Option<T>, defaultValue: T): T =>
  isSome(option) ? option[_value] : defaultValue;

export const get = <T>(option: Option<T>): T => {
  if (isNone(option)) {
    throw new Error("Cannot get value of None");
  }

  return option[_value];
};

export const equal = <T>(
  option1: Option<T>,
  option2: Option<T>,
  // ↓ in OCaml, this is first parameter. but last for optional
  fn: (v1: T, v2: T) => boolean = equalFn,
): boolean =>
  isSome(option1) && isSome(option2)
    ? fn(option1[_value], option2[_value])
    : isNone(option1) && isNone(option2);

export const compare = <T>(
  option1: Option<T>,
  option2: Option<T>,
  // ↓ in OCaml, this is first parameter. but last for optional
  fn: (v1: T, v2: T) => number = compareFn,
): number =>
  isSome(option1) && isSome(option2)
    ? fn(option1[_value], option2[_value])
    : compareFn(isSome(option1), isSome(option2));

export const bind = <T, U>(
  option: Option<T>,
  fn: (value: T) => Option<U>,
): Option<U> => (isSome(option) ? fn(option[_value]) : none());

export const map = <T, U>(fn: (value: T) => U, option: Option<T>): Option<U> =>
  isSome(option) ? some(fn(option[_value])) : none();

export const fold = <T, U>(
  none: U,
  fn: (value: T) => U,
  option: Option<T>,
): U => (isSome(option) ? fn(option[_value]) : none);

export const iter = <T>(fn: (value: T) => void, option: Option<T>): void => {
  if (isSome(option)) {
    fn(option[_value]);
  }
};

export const toResult = <T, E>(none: E, option: Option<T>): Result<T, E> =>
  isSome(option) ? Result.ok(option[_value]) : Result.err(none);
