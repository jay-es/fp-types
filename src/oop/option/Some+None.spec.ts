import { describe, expect, it, vi } from "vitest";
import { Err, Ok } from "../result";
import { None, Some } from "./Some+None";

describe("Some, None", () => {
  describe("isSome, isNone", () => {
    it("Some", () => {
      const some = new Some("foo");

      expect(some.isSome()).toBe(true);
      expect(some.isNone()).toBe(false);
    });

    it("None", () => {
      const none = new None();

      expect(none.isSome()).toBe(false);
      expect(none.isNone()).toBe(true);
    });
  });

  describe("value", () => {
    it("Some", () => {
      const some = new Some("foo");

      expect(some.value("bar")).toBe("foo");
    });

    it("None", () => {
      const none = new None();

      expect(none.value("bar")).toBe("bar");
    });
  });

  describe("get", () => {
    it("Some", () => {
      const some = new Some("foo");

      expect(some.get()).toBe("foo");
    });

    it("None", () => {
      const none = new None();

      expect(() => none.get()).toThrow();
    });
  });

  describe("equal", () => {
    it("Some", () => {
      const some1 = new Some("foo");
      const some2 = new Some("foo");
      const some3 = new Some("bar");
      const none = new None();

      const isSameLength = (a: string, b: string) => a.length === b.length;

      expect(some1.equal(some2)).toBe(true);
      expect(some1.equal(some3)).toBe(false);
      expect(some1.equal(some3, isSameLength)).toBe(true);
      expect(some1.equal(none)).toBe(false);
    });

    it("None", () => {
      const none1 = new None();
      const none2 = new None();
      const some = new Some("foo");

      expect(none1.equal(none2)).toBe(true);
      expect(none1.equal(some)).toBe(false);
    });
  });

  describe("bind", () => {
    it("Some", () => {
      const some = new Some("foo");
      const bound = some.bind((value) => new Some(value.endsWith("a")));

      expect(bound.equal(new Some(false))).toBe(true);
    });

    it("None", () => {
      const none = new None();
      const bound = none.bind((never) => new Some(7));

      expect(bound.equal(new None())).toBe(true);
    });
  });

  describe("map", () => {
    it("Some", () => {
      const some = new Some("foo");
      const mapped = some.map((value) => value.endsWith("a"));

      expect(mapped.equal(new Some(false))).toBe(true);
    });

    it("None", () => {
      const none = new None();
      const mapped = none.map((never) => 7);

      expect(mapped.equal(new None())).toBe(true);
    });
  });

  describe("map", () => {
    it("Some", () => {
      const some = new Some("foo");
      const mapped = some.map((value) => value.endsWith("a"));

      expect(mapped.equal(new Some(false))).toBe(true);
    });

    it("None", () => {
      const none = new None();
      const mapped = none.map((never) => 7);

      expect(mapped.equal(new None())).toBe(true);
    });
  });

  describe("fold", () => {
    it("Some", () => {
      const some = new Some("foo");
      const folded = some.fold(true, (value) => value.endsWith("a"));

      expect(folded).toBe(false);
    });

    it("None", () => {
      const none = new None();
      const folded = none.fold(42, (never) => 7);

      expect(folded).toBe(42);
    });
  });

  describe("iter", () => {
    it("Some", () => {
      const some = new Some("foo");
      const mock = vi.fn();
      some.iter((value) => mock(value));

      expect(mock).toBeCalledWith("foo");
    });

    it("None", () => {
      const none = new None();
      const mock = vi.fn();
      none.iter((never) => mock());

      expect(mock).not.toBeCalled();
    });
  });

  describe("toResult", () => {
    it("Some", () => {
      const some = new Some("foo");
      const result = some.toResult(42);

      expect(result.equal(new Ok("foo"))).toBe(true);
    });

    it("None", () => {
      const none = new None();
      const result = none.toResult(42);

      expect(result.equal(new Err(42))).toBe(true);
    });
  });
});
