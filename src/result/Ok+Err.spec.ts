import { describe, expect, it, vi } from "vitest";
import { Err, Ok } from "./Ok+Err";

describe("Ok, Err", () => {
  describe("isOk, isErr", () => {
    it("Ok", () => {
      const ok = new Ok("foo");

      expect(ok.isOk()).toBe(true);
      expect(ok.isErr()).toBe(false);
    });

    it("Err", () => {
      const err = new Err(42);

      expect(err.isOk()).toBe(false);
      expect(err.isErr()).toBe(true);
    });
  });

  describe("value", () => {
    it("Ok", () => {
      const ok = new Ok("foo");

      expect(ok.value("bar")).toBe("foo");
    });

    it("Err", () => {
      const err = new Err(42);

      expect(err.value("bar")).toBe("bar");
    });
  });

  describe("getOk, getErr", () => {
    it("Ok", () => {
      const ok = new Ok("foo");

      expect(ok.getOk()).toBe("foo");
      expect(() => ok.getErr()).toThrow();
    });

    it("Err", () => {
      const err = new Err(42);

      expect(() => err.getOk()).toThrow();
      expect(err.getErr()).toBe(42);
    });
  });

  describe("bind", () => {
    it("Ok", () => {
      const ok = new Ok("foo");
      const bound = ok.bind((value) => new Ok(value.endsWith("a")));

      expect(bound).toEqual(new Ok(false));
    });

    it("Err", () => {
      const err = new Err(42);
      const bound = err.bind((never) => new Ok(false));

      expect(bound).toEqual(new Err(42));
    });
  });

  describe("map, mapErr", () => {
    it("Ok", () => {
      const ok = new Ok("foo");
      const mapped = ok.map((value) => value.endsWith("a"));
      const mappedErr = ok.mapErr((never) => 7);

      expect(mapped).toEqual(new Ok(false));
      expect(mappedErr).toEqual(ok);
    });

    it("Err", () => {
      const err = new Err(42);
      const mapped = err.map((never) => false);
      const mappedErr = err.mapErr((error) => error.toFixed(1));

      expect(mapped).toEqual(err);
      expect(mappedErr).toEqual(new Err("42.0"));
    });
  });

  describe("fold", () => {
    it("Ok", () => {
      const ok = new Ok("foo");
      const folded = ok.fold(
        (value) => Symbol(value.substring(1)),
        (never) => Symbol()
      );

      expect(folded.description).toBe("oo");
    });

    it("Err", () => {
      const err = new Err(42);
      const folded = err.fold(
        (never) => Symbol(),
        (error) => Symbol(error.toFixed(1))
      );

      expect(folded.description).toBe("42.0");
    });
  });

  describe("iter, iterErr", () => {
    it("Ok", () => {
      const ok = new Ok("foo");
      const okMock = vi.fn();
      const errMock = vi.fn();
      ok.iter((value) => okMock(value));
      ok.iterErr((never) => errMock());

      expect(okMock).toBeCalledWith("foo");
      expect(errMock).not.toBeCalled();
    });

    it("Err", () => {
      const err = new Err(42);
      const okMock = vi.fn();
      const errMock = vi.fn();
      err.iter((never) => okMock());
      err.iterErr((error) => errMock(error));

      expect(okMock).not.toBeCalled();
      expect(errMock).toBeCalledWith(42);
    });
  });
});
