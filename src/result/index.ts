import type { Err, Ok } from "./Ok+Err";
export { Err, Ok } from "./Ok+Err";

export type Result<T, E> = Ok<T> | Err<E>;
