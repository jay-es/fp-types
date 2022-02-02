import { compareFn, equalFn } from "~/shared/helpers";
import { Option } from ".";

const _type = Symbol();
const _value = Symbol();
const _error = Symbol();

export type Ok<T> = {
  [_type]: "Ok";
  [_value]: T;
};

export type Err<E> = {
  [_type]: "Err";
  [_error]: E;
};

export type Result<T, E> = Ok<T> | Err<E>;

export const ok = <T = never, E = never>(value: T): Result<T, E> => ({
  [_type]: "Ok",
  [_value]: value,
});

export const err = <T = never, E = never>(error: E): Result<T, E> => ({
  [_type]: "Err",
  [_error]: error,
});

export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> =>
  result[_type] === "Ok";

export const isErr = <T, E>(result: Result<T, E>): result is Err<E> =>
  result[_type] === "Err";

export const value = <T, E>(result: Result<T, E>, defaultValue: T): T =>
  isOk(result) ? result[_value] : defaultValue;

export const getOk = <T, E>(result: Result<T, E>): T => {
  if (isOk(result)) {
    return result[_value];
  }

  throw new Error("Cannot get Ok from Err");
};

export const getErr = <T, E>(result: Result<T, E>): E => {
  if (isErr(result)) {
    return result[_error];
  }

  throw new Error("Cannot get Err from Ok");
};

export const equal = <T, E>(
  result: Result<T, E>,
  other: Result<T, E>,
  okFn: (v1: T, v2: T) => boolean = equalFn,
  errFn: (e1: E, e2: E) => boolean = equalFn,
): boolean => {
  if (isOk(result) && isOk(other)) {
    return okFn(result[_value], other[_value]);
  }

  if (isErr(result) && isErr(other)) {
    return errFn(result[_error], other[_error]);
  }

  return false;
};

export const compare = <T, E>(
  result: Result<T, E>,
  other: Result<T, E>,
  okFn: (v1: T, v2: T) => number = compareFn,
  errFn: (e1: E, e2: E) => number = compareFn,
): number => {
  if (isOk(result) && isOk(other)) {
    return okFn(result[_value], other[_value]);
  }

  if (isErr(result) && isErr(other)) {
    return errFn(result[_error], other[_error]);
  }

  return isOk(result) ? -1 : 1;
};

export const bind = <T, E, U>(
  result: Result<T, E>,
  okFn: (value: T) => Result<U, E>,
): Result<U, E> => (isOk(result) ? okFn(result[_value]) : result);

export const map = <T, E, U>(
  okFn: (value: T) => U,
  result: Result<T, E>,
): Result<U, E> => (isOk(result) ? ok(okFn(result[_value])) : result);

export const mapErr = <T, E, F>(
  errFn: (error: E) => F,
  result: Result<T, E>,
): Result<T, F> => (isErr(result) ? err(errFn(result[_error])) : result);

export const fold = <T, E, U>(
  okFn: (value: T) => U,
  errFn: (error: E) => U,
  result: Result<T, E>,
): U => (isOk(result) ? okFn(result[_value]) : errFn(result[_error]));

export const iter = <T, E>(
  okFn: (value: T) => void,
  result: Result<T, E>,
): void => {
  isOk(result) && okFn(result[_value]);
};

export const iterErr = <T, E>(
  errFn: (error: E) => void,
  result: Result<T, E>,
): void => {
  isErr(result) && errFn(result[_error]);
};

export const toOption = <T, E>(result: Result<T, E>): Option<T> =>
  isOk(result) ? Option.some(result[_value]) : Option.none();
