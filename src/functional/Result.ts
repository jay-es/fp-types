import { equalFn } from "~/src/shared/helpers";
import { Option } from ".";

export type Ok<T> = {
  type: "Ok";
  value: T;
};

export type Err<E> = {
  type: "Err";
  error: E;
};

export type Result<T, E> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({
  type: "Ok",
  value,
});

export const err = <E>(error: E): Err<E> => ({
  type: "Err",
  error,
});

export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> =>
  result.type === "Ok";

export const isErr = <T, E>(result: Result<T, E>): result is Err<E> =>
  result.type === "Err";

export const value = <T, E>(result: Result<T, E>, defaultValue: T): T =>
  isOk(result) ? result.value : defaultValue;

export const getOk = <T, E>(result: Result<T, E>): T => {
  if (isOk(result)) {
    return result.value;
  }

  throw new Error("Cannot get Ok from Err");
};

export const getErr = <T, E>(result: Result<T, E>): E => {
  if (isErr(result)) {
    return result.error;
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
    return okFn(result.value, other.value);
  }

  if (isErr(result) && isErr(other)) {
    return errFn(result.error, other.error);
  }

  return false;
};

export const bind = <T, E, U>(
  result: Result<T, E>,
  okFn: (value: T) => Result<U, E>,
): Result<U, E> => (isOk(result) ? okFn(result.value) : result);

export const map = <T, E, U>(
  okFn: (value: T) => U,
  result: Result<T, E>,
): Result<U, E> => (isOk(result) ? ok(okFn(result.value)) : result);

export const mapErr = <T, E, F>(
  errFn: (error: E) => F,
  result: Result<T, E>,
): Result<T, F> => (isErr(result) ? err(errFn(result.error)) : result);

export const fold = <T, E, U>(
  okFn: (value: T) => U,
  errFn: (error: E) => U,
  result: Result<T, E>,
): U => (isOk(result) ? okFn(result.value) : errFn(result.error));

export const iter = <T, E>(
  okFn: (value: T) => void,
  result: Result<T, E>,
): void => {
  isOk(result) && okFn(result.value);
};

export const iterErr = <T, E>(
  errFn: (error: E) => void,
  result: Result<T, E>,
): void => {
  isErr(result) && errFn(result.error);
};

export const toOption = <T, E>(result: Result<T, E>): Option<T> =>
  isOk(result) ? Option.some(result.value) : Option.none();
