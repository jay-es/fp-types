import { describe, expect, it, vi } from "vitest";
import { Option, Result } from ".";

describe("Result", () => {
  describe("isOk, isErr", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");

      expect(Result.isOk(ok)).toBe(true);
      expect(Result.isErr(ok)).toBe(false);
    });

    it("Err", () => {
      const err = Result.err(42);

      expect(Result.isOk(err)).toBe(false);
      expect(Result.isErr(err)).toBe(true);
    });
  });

  describe("value", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");

      expect(Result.value(ok, "bar")).toBe("foo");
    });

    it("Err", () => {
      const err = Result.err(42);

      expect(Result.value(err, "bar")).toBe("bar");
    });
  });

  describe("getOk, getErr", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");

      expect(Result.getOk(ok)).toBe("foo");
      expect(() => Result.getErr(ok)).toThrow();
    });

    it("Err", () => {
      const err = Result.err(42);

      expect(() => Result.getOk(err)).toThrow();
      expect(Result.getErr(err)).toBe(42);
    });
  });

  describe("equal", () => {
    it("Ok", () => {
      const ok1 = Result.ok("foo");
      const ok2 = Result.ok("foo");
      const ok3 = Result.ok("bar");
      const err = Result.err("foo");

      const isSameLength = (a: string, b: string) => a.length === b.length;

      expect(Result.equal(ok1, ok2)).toBe(true);
      expect(Result.equal(ok1, ok3)).toBe(false);
      expect(Result.equal(ok1, ok3, isSameLength)).toBe(true);
      expect(Result.equal(ok1, err)).toBe(false);
    });

    it("Err", () => {
      const err1 = Result.err(42);
      const err2 = Result.err(42);
      const err3 = Result.err(7);
      const ok = Result.ok(42);

      const isDivisor = (a: number, b: number) => a % b === 0;

      expect(Result.equal(err1, err2)).toBe(true);
      expect(Result.equal(err1, err3)).toBe(false);
      expect(Result.equal(err1, err3, undefined, isDivisor)).toBe(true);
      expect(Result.equal(err1, ok)).toBe(false);
    });
  });

  describe("compare", () => {
    it("Ok", () => {
      const ok1 = Result.ok("foo");
      const ok2 = Result.ok("foo");
      const ok3 = Result.ok("bar");
      const err = Result.err("foo");

      const compareLength = (a: string, b: string) => a.length - b.length;

      expect(Result.compare(ok1, ok2)).toBe(0);
      expect(Result.compare(ok1, ok3)).toBe(1);
      expect(Result.compare(ok1, ok3, compareLength)).toBe(0);

      expect(Result.compare(ok1, err)).toBe(-1);
      expect(Result.compare(err, ok1)).toBe(1);
    });

    it("Err", () => {
      const err1 = Result.err(42);
      const err2 = Result.err(42);
      const err3 = Result.err(7);

      const mod = (a: number, b: number) => a % b;

      expect(Result.compare(err1, err2)).toBe(0);
      expect(Result.compare(err1, err3)).toBe(1);
      expect(Result.compare(err1, err3, undefined, mod)).toBe(0);
    });
  });

  describe("bind", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");
      const bound = Result.bind(ok, (value) => Result.ok(value.endsWith("a")));

      expect(Result.equal(bound, Result.ok(false))).toBe(true);
    });

    it("Err", () => {
      const err = Result.err(42);
      const bound = Result.bind(err, (never) => Result.ok(false));

      expect(Result.equal(bound, Result.err(42))).toBe(true);
    });
  });

  describe("map, mapErr", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");
      const mapped = Result.map((value) => value.endsWith("a"), ok);
      const mappedErr = Result.mapErr((never) => 7, ok);

      expect(Result.equal(mapped, Result.ok(false))).toBe(true);
      expect(Result.equal(mappedErr, ok)).toBe(true);
    });

    it("Err", () => {
      const err = Result.err(42);
      const mapped = Result.map((never) => false, err);
      const mappedErr = Result.mapErr((error) => error.toFixed(1), err);

      expect(Result.equal(mapped, err)).toBe(true);
      expect(Result.equal(mappedErr, Result.err("42.0"))).toBe(true);
    });
  });

  describe("fold", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");
      const folded = Result.fold(
        (value) => Symbol(value.substring(1)),
        (never) => Symbol(),
        ok,
      );

      expect(folded.description).toBe("oo");
    });

    it("Err", () => {
      const err = Result.err(42);
      const folded = Result.fold(
        (never) => Symbol(),
        (error) => Symbol(error.toFixed(1)),
        err,
      );

      expect(folded.description).toBe("42.0");
    });
  });

  describe("iter, iterErr", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");
      const okMock = vi.fn();
      const errMock = vi.fn();
      Result.iter((value) => okMock(value), ok);
      Result.iterErr((never) => errMock(), ok);

      expect(okMock).toBeCalledWith("foo");
      expect(errMock).not.toBeCalled();
    });

    it("Err", () => {
      const err = Result.err(42);
      const okMock = vi.fn();
      const errMock = vi.fn();
      Result.iter((never) => okMock(), err);
      Result.iterErr((error) => errMock(error), err);

      expect(okMock).not.toBeCalled();
      expect(errMock).toBeCalledWith(42);
    });
  });

  describe("toOption", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");
      const option = Result.toOption(ok);

      expect(Option.equal(option, Option.some("foo"))).toBe(true);
    });

    it("Err", () => {
      const err = Result.err(42);
      const option = Result.toOption(err);

      expect(Option.equal(option, Option.none())).toBe(true);
    });
  });
});
