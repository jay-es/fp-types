import { describe, expect, it, vi } from "vitest";
import { Option } from "./Option";
import { Result } from "./Result";

describe("Option", () => {
  describe("isSome, isNone", () => {
    it("Some", () => {
      const some = Option.some("foo");

      expect(some.isSome()).toBe(true);
      expect(some.isNone()).toBe(false);
    });

    it("None", () => {
      const none = Option.none();

      expect(none.isSome()).toBe(false);
      expect(none.isNone()).toBe(true);
    });
  });

  describe("value", () => {
    it("Some", () => {
      const some = Option.some("foo");

      expect(some.value("bar")).toBe("foo");
    });

    it("None", () => {
      const none = Option.none();

      expect(none.value("bar")).toBe("bar");
    });
  });

  describe("get", () => {
    it("Some", () => {
      const some = Option.some("foo");

      expect(some.get()).toBe("foo");
    });

    it("None", () => {
      const none = Option.none();

      expect(() => none.get()).toThrow();
    });
  });

  describe("equal", () => {
    it("Some", () => {
      const some1 = Option.some("foo");
      const some2 = Option.some("foo");
      const some3 = Option.some("bar");
      const none = Option.none();

      const isSameLength = (a: string, b: string) => a.length === b.length;

      expect(some1.equal(some2)).toBe(true);
      expect(some1.equal(some3)).toBe(false);
      expect(some1.equal(some3, isSameLength)).toBe(true);
      expect(some1.equal(none)).toBe(false);
    });

    it("None", () => {
      const none1 = Option.none();
      const none2 = Option.none();
      const some = Option.some("foo");

      expect(none1.equal(none2)).toBe(true);
      expect(none1.equal(some)).toBe(false);
    });
  });

  describe("compare", () => {
    it("Some", () => {
      const some1 = Option.some("foo");
      const some2 = Option.some("foo");
      const some3 = Option.some("bar");

      const compareLength = (a: string, b: string) => a.length - b.length;

      expect(some1.compare(some2)).toBe(0);
      expect(some1.compare(some3)).toBe(1);
      expect(some1.compare(some3, compareLength)).toBe(0);
    });

    it("None", () => {
      const none1 = Option.none();
      const none2 = Option.none();
      const some = Option.some("foo");

      expect(none1.compare(none2)).toBe(0);
      expect(some.compare(none2)).toBe(1);
      expect(none1.compare(some)).toBe(-1);
    });
  });

  describe("bind", () => {
    it("Some", () => {
      const some = Option.some("foo");
      const bound = some.bind((value) => Option.some(value.endsWith("a")));

      expect(bound.equal(Option.some(false))).toBe(true);
    });

    it("None", () => {
      const none = Option.none();
      const bound = none.bind((value) => Option.some(7));

      expect(bound.equal(Option.none())).toBe(true);
    });
  });

  describe("map", () => {
    it("Some", () => {
      const some = Option.some("foo");
      const mapped = some.map((value) => value.endsWith("a"));

      expect(mapped.equal(Option.some(false))).toBe(true);
    });

    it("None", () => {
      const none = Option.none();
      const mapped = none.map((value) => 7);

      expect(mapped.equal(Option.none())).toBe(true);
    });
  });

  describe("fold", () => {
    it("Some", () => {
      const some = Option.some("foo");
      const folded = some.fold(true, (value) => value.endsWith("a"));

      expect(folded).toBe(false);
    });

    it("None", () => {
      const none = Option.none();
      const folded = none.fold(42, (value) => 7);

      expect(folded).toBe(42);
    });
  });

  describe("iter", () => {
    it("Some", () => {
      const some = Option.some("foo");
      const mock = vi.fn();
      some.iter((value) => mock(value));

      expect(mock).toBeCalledWith("foo");
    });

    it("None", () => {
      const none = Option.none();
      const mock = vi.fn();
      none.iter((value) => mock());

      expect(mock).not.toBeCalled();
    });
  });

  describe("toResult", () => {
    it("Some", () => {
      const some = Option.some("foo");
      const result = some.toResult(42);

      expect(result.equal(Result.ok("foo"))).toBe(true);
    });

    it("None", () => {
      const none = Option.none();
      const result = none.toResult(42);

      expect(result.equal(Result.err(42))).toBe(true);
    });
  });
});
