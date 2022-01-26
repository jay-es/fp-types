import { describe, expect, it, vi } from "vitest";
import { Either } from "./Either";
import { Option } from "./Option";

describe("Either", () => {
  describe("isLeft, isRight", () => {
    it("Left", () => {
      const left = Either.left("foo");

      expect(left.isLeft()).toBe(true);
      expect(left.isRight()).toBe(false);
    });

    it("Right", () => {
      const right = Either.right(42);

      expect(right.isLeft()).toBe(false);
      expect(right.isRight()).toBe(true);
    });
  });

  describe("findLeft, findRight", () => {
    it("Left", () => {
      const left = Either.left("foo");

      expect(left.findLeft().equal(Option.some("foo"))).toBe(true);
      expect(left.findRight().equal(Option.none())).toBe(true);
    });

    it("Right", () => {
      const right = Either.right(42);

      expect(right.findLeft().equal(Option.none())).toBe(true);
      expect(right.findRight().equal(Option.some(42))).toBe(true);
    });
  });

  describe("getLeft, getRight", () => {
    it("Left", () => {
      const left = Either.left("foo");

      expect(left.getLeft()).toBe("foo");
      expect(() => left.getRight()).toThrow();
    });

    it("Right", () => {
      const right = Either.right(42);

      expect(() => right.getLeft()).toThrow();
      expect(right.getRight()).toBe(42);
    });
  });

  describe("equal", () => {
    it("Left", () => {
      const left1 = Either.left("foo");
      const left2 = Either.left("foo");
      const left3 = Either.left("bar");
      const right = Either.right("foo");

      const isSameLength = (a: string, b: string) => a.length === b.length;

      expect(left1.equal(left2)).toBe(true);
      expect(left1.equal(left3)).toBe(false);
      expect(left1.equal(left3, isSameLength)).toBe(true);
      expect(left1.equal(right)).toBe(false);
    });

    it("Right", () => {
      const right1 = Either.right(42);
      const right2 = Either.right(42);
      const right3 = Either.right(7);
      const left = Either.left(42);

      const isDivisor = (a: number, b: number) => a % b === 0;

      expect(right1.equal(right2)).toBe(true);
      expect(right1.equal(right3)).toBe(false);
      expect(right1.equal(right3, undefined, isDivisor)).toBe(true);
      expect(right1.equal(left)).toBe(false);
    });
  });

  describe("mapLeft, mapRight", () => {
    it("Left", () => {
      const left = Either.left("foo");
      const mappedLeft = left.mapLeft((left) => left.endsWith("a"));
      const mappedRight = left.mapRight((right) => 7);

      expect(mappedLeft.equal(Either.left(false))).toBe(true);
      expect(mappedRight.equal(left)).toBe(true);
    });

    it("Right", () => {
      const right = Either.right(42);
      const mappedLeft = right.mapLeft((left) => false);
      const mappedRight = right.mapRight((right) => right.toFixed(1));

      expect(mappedLeft.equal(right)).toBe(true);
      expect(mappedRight.equal(Either.right("42.0"))).toBe(true);
    });
  });

  describe("map", () => {
    it("Left", () => {
      const left = Either.left("foo");
      const mapped = left.map(
        (left) => left.endsWith("a"),
        (right) => 7,
      );

      expect(mapped.equal(Either.left(false))).toBe(true);
    });

    it("Right", () => {
      const right = Either.right(42);
      const mapped = right.map(
        (left) => false,
        (right) => right.toFixed(1),
      );

      expect(mapped.equal(Either.right("42.0"))).toBe(true);
    });
  });

  describe("fold", () => {
    it("Left", () => {
      const left = Either.left("foo");
      const folded = left.fold(
        (left) => Symbol(left.substring(1)),
        (right) => Symbol(),
      );

      expect(folded.description).toBe("oo");
    });

    it("Right", () => {
      const right = Either.right(42);
      const folded = right.fold(
        (left) => Symbol(),
        (right) => Symbol(right.toFixed(1)),
      );

      expect(folded.description).toBe("42.0");
    });
  });

  describe("iter", () => {
    it("Left", () => {
      const left = Either.left("foo");
      const leftMock = vi.fn();
      const rightMock = vi.fn();
      left.iter(
        (left) => leftMock(left),
        (right) => rightMock(),
      );

      expect(leftMock).toBeCalledWith("foo");
      expect(rightMock).not.toBeCalled();
    });

    it("Right", () => {
      const right = Either.right(42);
      const leftMock = vi.fn();
      const rightMock = vi.fn();
      right.iter(
        (left) => leftMock(),
        (right) => rightMock(right),
      );

      expect(leftMock).not.toBeCalled();
      expect(rightMock).toBeCalledWith(42);
    });
  });

  describe("forAll", () => {
    it("Left", () => {
      const left = Either.left("foo");
      const result = left.forAll(
        (left) => left.endsWith("a"),
        (right) => true,
      );

      expect(result).toBe(false);
    });

    it("Right", () => {
      const right = Either.right(42);
      const result = right.forAll(
        (left) => true,
        (right) => right.toFixed() === "bar",
      );

      expect(result).toBe(false);
    });
  });
});
