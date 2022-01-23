import { describe, expect, it, vi } from "vitest";
import { Left, Right } from "./Left+Right";
import { None, Some } from "../option";

describe("Left, Right", () => {
  describe("isLeft, isRight", () => {
    it("Left", () => {
      const left = new Left("foo");

      expect(left.isLeft()).toBe(true);
      expect(left.isRight()).toBe(false);
    });

    it("Right", () => {
      const right = new Right(42);

      expect(right.isLeft()).toBe(false);
      expect(right.isRight()).toBe(true);
    });
  });

  describe("findLeft, findRight", () => {
    it("Left", () => {
      const left = new Left("foo");

      expect(left.findLeft().equal(new Some("foo"))).toBe(true);
      expect(left.findRight().equal(new None())).toBe(true);
    });

    it("Right", () => {
      const right = new Right(42);

      expect(right.findLeft().equal(new None())).toBe(true);
      expect(right.findRight().equal(new Some(42))).toBe(true);
    });
  });

  describe("getLeft, getRight", () => {
    it("Left", () => {
      const left = new Left("foo");

      expect(left.getLeft()).toBe("foo");
      expect(() => left.getRight()).toThrow();
    });

    it("Right", () => {
      const right = new Right(42);

      expect(() => right.getLeft()).toThrow();
      expect(right.getRight()).toBe(42);
    });
  });

  describe("equal", () => {
    it("Left", () => {
      const left1 = new Left("foo");
      const left2 = new Left("foo");
      const left3 = new Left("bar");
      const right = new Right("foo");

      const isSameLength = (a: string, b: string) => a.length === b.length;

      expect(left1.equal(left2)).toBe(true);
      expect(left1.equal(left3)).toBe(false);
      expect(left1.equal(left3, isSameLength)).toBe(true);
      expect(left1.equal(right)).toBe(false);
    });

    it("Right", () => {
      const right1 = new Right(42);
      const right2 = new Right(42);
      const right3 = new Right(7);
      const left = new Left(42);

      const isDivisor = (a: number, b: number) => a % b === 0;

      expect(right1.equal(right2)).toBe(true);
      expect(right1.equal(right3)).toBe(false);
      expect(right1.equal(right3, undefined, isDivisor)).toBe(true);
      expect(right1.equal(left)).toBe(false);
    });
  });

  describe("mapLeft, mapRight", () => {
    it("Left", () => {
      const left = new Left("foo");
      const mappedLeft = left.mapLeft((value) => value.endsWith("a"));
      const mappedRight = left.mapRight((never) => 7);

      expect(mappedLeft.equal(new Left(false))).toBe(true);
      expect(mappedRight.equal(left)).toBe(true);
    });

    it("Right", () => {
      const right = new Right(42);
      const mappedLeft = right.mapLeft((never) => false);
      const mappedRight = right.mapRight((value) => value.toFixed(1));

      expect(mappedLeft.equal(right)).toBe(true);
      expect(mappedRight.equal(new Right("42.0"))).toBe(true);
    });
  });

  describe("map", () => {
    it("Left", () => {
      const left = new Left("foo");
      const mapped = left.map(
        (value) => value.endsWith("a"),
        (never) => 7
      );

      expect(mapped.equal(new Left(false))).toBe(true);
    });

    it("Right", () => {
      const right = new Right(42);
      const mapped = right.map(
        (never) => false,
        (value) => value.toFixed(1)
      );

      expect(mapped.equal(new Right("42.0"))).toBe(true);
    });
  });

  describe("fold", () => {
    it("Left", () => {
      const left = new Left("foo");
      const folded = left.fold(
        (value) => Symbol(value.substring(1)),
        (never) => Symbol()
      );

      expect(folded.description).toBe("oo");
    });

    it("Right", () => {
      const right = new Right(42);
      const folded = right.fold(
        (never) => Symbol(),
        (value) => Symbol(value.toFixed(1))
      );

      expect(folded.description).toBe("42.0");
    });
  });

  describe("iter", () => {
    it("Left", () => {
      const left = new Left("foo");
      const leftMock = vi.fn();
      const rightMock = vi.fn();
      left.iter(
        (value) => leftMock(value),
        (never) => rightMock()
      );

      expect(leftMock).toBeCalledWith("foo");
      expect(rightMock).not.toBeCalled();
    });

    it("Right", () => {
      const right = new Right(42);
      const leftMock = vi.fn();
      const rightMock = vi.fn();
      right.iter(
        (never) => leftMock(),
        (value) => rightMock(value)
      );

      expect(leftMock).not.toBeCalled();
      expect(rightMock).toBeCalledWith(42);
    });
  });

  describe("forAll", () => {
    it("Left", () => {
      const left = new Left("foo");
      const result = left.forAll(
        (value) => value.endsWith("a"),
        (never) => true
      );

      expect(result).toBe(false);
    });

    it("Right", () => {
      const right = new Right(42);
      const result = right.forAll(
        (never) => true,
        (value) => value.toFixed() === "bar"
      );

      expect(result).toBe(false);
    });
  });
});
