import { describe, expect, it, vi } from "vitest";
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

  describe("bind", () => {
    it("Some", () => {
      const some = new Some("foo");
      const bound = some.bind((value) => new Some(value.endsWith("a")));

      expect(bound).toEqual(new Some(false));
    });

    it("None", () => {
      const none = new None();
      const bound = none.bind((never) => new Some(7));

      expect(bound).toEqual(new None());
    });
  });

  describe("map", () => {
    it("Some", () => {
      const some = new Some("foo");
      const mapped = some.map((value) => value.endsWith("a"));

      expect(mapped).toEqual(new Some(false));
    });

    it("None", () => {
      const none = new None();
      const mapped = none.map((never) => 7);

      expect(mapped).toEqual(new None());
    });
  });

  describe("map", () => {
    it("Some", () => {
      const some = new Some("foo");
      const mapped = some.map((value) => value.endsWith("a"));

      expect(mapped).toEqual(new Some(false));
    });

    it("None", () => {
      const none = new None();
      const mapped = none.map((never) => 7);

      expect(mapped).toEqual(new None());
    });
  });

  describe("fold", () => {
    it("Some", () => {
      const some = new Some("foo");
      const folded = some.fold(true, (value) => value.endsWith("a"));

      expect(folded).toEqual(false);
    });

    it("None", () => {
      const none = new None();
      const folded = none.fold(42, (never) => 7);

      expect(folded).toEqual(42);
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
});
