import * as EitherModule from "./Either";
import * as OptionModule from "./Option";
import * as ResultModule from "./Result";

export type { Left, Right } from "./Either";
export type Either<L, R> = EitherModule.Either<L, R>;
export const Either = EitherModule;

export type { None, Some } from "./Option";
export type Option<T> = OptionModule.Option<T>;
export const Option = OptionModule;

export type { Err, Ok } from "./Result";
export type Result<T, E> = ResultModule.Result<T, E>;
export const Result = ResultModule;
