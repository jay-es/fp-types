import { describe, expect, it } from "vitest";
import { pipe } from "./pipe";

describe("pipe", () => {
  const dbl = (num: number) => num * 2;

  it("x1", () => {
    const result = pipe(1, dbl);

    expect(result).toBe(2);
  });

  it("x2", () => {
    const result = pipe(1, dbl, dbl);

    expect(result).toBe(4);
  });

  it("x3", () => {
    // @ts-expect-error 引数の型が合わないのでエラーになる
    pipe(1, dbl, String, dbl);

    expect(pipe(2, dbl, dbl, String)).toBe(String(dbl(dbl(2))));
  });

  it("max", () => {
    const fn1 = (n: number) => Boolean(n);
    const fn2 = (b: boolean) => Number(b);

    const result = pipe(
      1,
      fn1,
      fn2,
      fn1,
      fn2,
      fn1,
      fn2,
      fn1,
      fn2,
      fn1,
      fn2,
      fn1,
      fn2,
      fn1,
      fn2,
      fn1,
      fn2,
      fn1,
      fn2,
      fn1,
      fn2,
    );

    expect(result).toBe(1);
  });
});
