import { describe, expect, it, vi } from "vitest";
import { Option } from "./Option";
import { Result } from "./Result";

describe("Result", () => {
  describe("isOk, isErr", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");

      expect(ok.isOk()).toBe(true);
      expect(ok.isErr()).toBe(false);
    });

    it("Err", () => {
      const err = Result.err(42);

      expect(err.isOk()).toBe(false);
      expect(err.isErr()).toBe(true);
    });
  });

  describe("value", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");

      expect(ok.value("bar")).toBe("foo");
    });

    it("Err", () => {
      const err = Result.err(42);

      expect(err.value("bar")).toBe("bar");
    });
  });

  describe("getOk, getErr", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");

      expect(ok.getOk()).toBe("foo");
      expect(() => ok.getErr()).toThrow();
    });

    it("Err", () => {
      const err = Result.err(42);

      expect(() => err.getOk()).toThrow();
      expect(err.getErr()).toBe(42);
    });
  });

  describe("equal", () => {
    it("Ok", () => {
      const ok1 = Result.ok("foo");
      const ok2 = Result.ok("foo");
      const ok3 = Result.ok("bar");
      const err = Result.err("foo");

      const isSameLength = (a: string, b: string) => a.length === b.length;

      expect(ok1.equal(ok2)).toBe(true);
      expect(ok1.equal(ok3)).toBe(false);
      expect(ok1.equal(ok3, isSameLength)).toBe(true);
      expect(ok1.equal(err)).toBe(false);
    });

    it("Err", () => {
      const err1 = Result.err(42);
      const err2 = Result.err(42);
      const err3 = Result.err(7);
      const ok = Result.ok(42);

      const isDivisor = (a: number, b: number) => a % b === 0;

      expect(err1.equal(err2)).toBe(true);
      expect(err1.equal(err3)).toBe(false);
      expect(err1.equal(err3, undefined, isDivisor)).toBe(true);
      expect(err1.equal(ok)).toBe(false);
    });
  });

  describe("bind", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");
      const bound = ok.bind((value) => Result.ok(value.endsWith("a")));

      expect(bound.equal(Result.ok(false))).toBe(true);
    });

    it("Err", () => {
      const err = Result.err(42);
      const bound = err.bind((never) => Result.ok(false));

      expect(bound.equal(Result.err(42))).toBe(true);
    });
  });

  describe("map, mapErr", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");
      const mapped = ok.map((value) => value.endsWith("a"));
      const mappedErr = ok.mapErr((never) => 7);

      expect(mapped.equal(Result.ok(false))).toBe(true);
      expect(mappedErr.equal(ok)).toBe(true);
    });

    it("Err", () => {
      const err = Result.err(42);
      const mapped = err.map((never) => false);
      const mappedErr = err.mapErr((error) => error.toFixed(1));

      expect(mapped.equal(err)).toBe(true);
      expect(mappedErr.equal(Result.err("42.0"))).toBe(true);
    });
  });

  describe("fold", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");
      const folded = ok.fold(
        (value) => Symbol(value.substring(1)),
        (never) => Symbol()
      );

      expect(folded.description).toBe("oo");
    });

    it("Err", () => {
      const err = Result.err(42);
      const folded = err.fold(
        (never) => Symbol(),
        (error) => Symbol(error.toFixed(1))
      );

      expect(folded.description).toBe("42.0");
    });
  });

  describe("iter, iterErr", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");
      const okMock = vi.fn();
      const errMock = vi.fn();
      ok.iter((value) => okMock(value));
      ok.iterErr((never) => errMock());

      expect(okMock).toBeCalledWith("foo");
      expect(errMock).not.toBeCalled();
    });

    it("Err", () => {
      const err = Result.err(42);
      const okMock = vi.fn();
      const errMock = vi.fn();
      err.iter((never) => okMock());
      err.iterErr((error) => errMock(error));

      expect(okMock).not.toBeCalled();
      expect(errMock).toBeCalledWith(42);
    });
  });

  describe("toOption", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");
      const option = ok.toOption();

      expect(option.equal(Option.some("foo"))).toBe(true);
    });

    it("Err", () => {
      const err = Result.err(42);
      const option = err.toOption();

      expect(option.equal(Option.none())).toBe(true);
    });
  });
});
