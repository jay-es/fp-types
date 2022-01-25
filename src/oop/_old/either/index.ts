import type { Left, Right } from "./Left+Right";
export { Left, Right } from "./Left+Right";

export type Either<L, R> = Left<L> | Right<R>;
