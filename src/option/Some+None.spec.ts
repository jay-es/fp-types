import { describe, expect, it } from "vitest";
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
});
