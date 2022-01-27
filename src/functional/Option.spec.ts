import { describe, expect, it, vi } from "vitest";
import { Result } from ".";
import * as Option from "./Option";

describe("Option", () => {
  describe("isSome, isNone", () => {
    it("Some", () => {
      const some = Option.some("foo");

      expect(Option.isSome(some)).toBe(true);
      expect(Option.isNone(some)).toBe(false);
    });

    it("None", () => {
      const none = Option.none();

      expect(Option.isSome(none)).toBe(false);
      expect(Option.isNone(none)).toBe(true);
    });
  });

  describe("value", () => {
    it("Some", () => {
      const some = Option.some("foo");

      expect(Option.value(some, "bar")).toBe("foo");
    });

    it("None", () => {
      const none = Option.none();

      expect(Option.value(none, "bar")).toBe("bar");
    });
  });

  describe("get", () => {
    it("Some", () => {
      const some = Option.some("foo");

      expect(Option.get(some)).toBe("foo");
    });

    it("None", () => {
      const none = Option.none();

      expect(() => Option.get(none)).toThrow();
    });
  });

  describe("equal", () => {
    it("Some", () => {
      const some1 = Option.some("foo");
      const some2 = Option.some("foo");
      const some3 = Option.some("bar");
      const none = Option.none();

      const isSameLength = (a: string, b: string) => a.length === b.length;

      expect(Option.equal(some1, some2)).toBe(true);
      expect(Option.equal(some1, some3)).toBe(false);
      expect(Option.equal(some1, some3, isSameLength)).toBe(true);
      expect(Option.equal(some1, none)).toBe(false);
    });

    it("None", () => {
      const none1 = Option.none();
      const none2 = Option.none();
      const some = Option.some("foo");

      expect(Option.equal(none1, none2)).toBe(true);
      expect(Option.equal(none1, some)).toBe(false);
    });
  });

  describe("bind", () => {
    it("Some", () => {
      const some = Option.some("foo");
      const bound = Option.bind(some, (value) =>
        Option.some(value.endsWith("a")),
      );

      expect(Option.equal(bound, Option.some(false))).toBe(true);
    });

    it("None", () => {
      const none = Option.none();
      const bound = Option.bind(none, (unknown) => Option.some(7));

      expect(Option.equal(bound, Option.none())).toBe(true);
    });
  });

  describe("map", () => {
    it("Some", () => {
      const some = Option.some("foo");
      const mapped = Option.map((value) => value.endsWith("a"), some);

      expect(Option.equal(mapped, Option.some(false))).toBe(true);
    });

    it("None", () => {
      const none = Option.none();
      const mapped = Option.map((unknown) => 7, none);

      expect(Option.equal(mapped, Option.none())).toBe(true);
    });
  });

  describe("fold", () => {
    it("Some", () => {
      const some = Option.some("foo");
      const folded = Option.fold(true, (value) => value.endsWith("a"), some);

      expect(folded).toBe(false);
    });

    it("None", () => {
      const none = Option.none();
      const folded = Option.fold(42, (unknown) => 7, none);

      expect(folded).toBe(42);
    });
  });

  describe("iter", () => {
    it("Some", () => {
      const some = Option.some("foo");
      const mock = vi.fn();
      Option.iter((value) => mock(value), some);

      expect(mock).toBeCalledWith("foo");
    });

    it("None", () => {
      const none = Option.none();
      const mock = vi.fn();
      Option.iter((unknown) => mock(), none);

      expect(mock).not.toBeCalled();
    });
  });

  describe("toResult", () => {
    it("Some", () => {
      const some = Option.some("foo");
      const result = Option.toResult(42, some);

      expect(Result.equal(result, Result.ok("foo"))).toBe(true);
    });

    it("None", () => {
      const none = Option.none();
      const result = Option.toResult(42, none);

      expect(Result.equal(result, Result.err(42))).toBe(true);
    });
  });
});
