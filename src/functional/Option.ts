import { equalFn } from "~/src/shared/helpers";
import { Result } from ".";

export type Some<T> = {
  type: "Some";
  value: T;
};

export type None = {
  type: "None";
};

export type Option<T> = Some<T> | None;

export const some = <T>(value: T): Some<T> => ({
  type: "Some",
  value,
});

export const none = (): None => ({
  type: "None",
});

export const isSome = <T>(option: Option<T>): option is Some<T> =>
  option.type === "Some";

export const isNone = <T>(option: Option<T>): option is None =>
  option.type === "None";

export const value = <T>(option: Option<T>, defaultValue: T): T =>
  isSome(option) ? option.value : defaultValue;

export const get = <T>(option: Option<T>): T => {
  if (isNone(option)) {
    throw new Error("Cannot get value of None");
  }

  return option.value;
};

export const equal = <T>(
  option1: Option<T>,
  option2: Option<T>,
  // ↓ in OCaml, this is first parameter. but last for optional
  fn: (v1: T, v2: T) => boolean = equalFn,
): boolean => {
  if (isNone(option1) && isNone(option2)) return true;
  if (isNone(option1) || isNone(option2)) return false;

  return fn(option1.value, option2.value);
};

export const bind = <T, U>(
  option: Option<T>,
  fn: (value: T) => Option<U>,
): Option<U> => (isSome(option) ? fn(option.value) : none());

export const map = <T, U>(fn: (value: T) => U, option: Option<T>): Option<U> =>
  isSome(option) ? some(fn(option.value)) : none();

export const fold = <T, U>(
  none: U,
  fn: (value: T) => U,
  option: Option<T>,
): U => (isSome(option) ? fn(option.value) : none);

export const iter = <T>(fn: (value: T) => void, option: Option<T>): void => {
  if (isSome(option)) {
    fn(option.value);
  }
};

export const toResult = <T, E>(none: E, option: Option<T>): Result<T, E> =>
  isSome(option) ? Result.ok(option.value) : Result.err(none);
