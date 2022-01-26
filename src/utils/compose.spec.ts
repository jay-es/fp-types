import { describe, expect, it } from "vitest";
import { compose } from "./compose";

describe("compose", () => {
  const inc = (n: number) => n + 1;
  const sqr = (n: number) => n ** 2;
  const str = (n: number) => n.toString();

  it("x1 multiple args", () => {
    const add = (a: number, b: number) => a + b;
    const comp1 = compose(add);

    expect(comp1(1, 2)).toBe(3);
  });

  it("x2 value", () => {
    expect(compose(sqr, inc)(2)).toBe(sqr(inc(2)));
    expect(compose(inc, sqr)(2)).toBe(inc(sqr(2)));
  });

  it("x2 typing", () => {
    const comp1 = compose(str, inc);

    expect(comp1(2)).toBe("3");
  });

  it("x3", () => {
    const comp1 = compose(inc, sqr, inc);
    const comp2 = compose(str, sqr, inc);

    expect(comp1(2)).toBe(10);
    expect(comp2(2)).toBe("9");
  });

  it("max", () => {
    const fn1 = (n: number) => !!n;
    const fn2 = (b: boolean) => Number(b);

    const comp = compose(
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
      fn1,
    );

    expect(comp(1)).toBe(1);
  });
});
