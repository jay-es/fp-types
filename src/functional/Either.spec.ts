import { describe, expect, it, vi } from "vitest";
import { Either, Option } from ".";

describe("Either", () => {
  describe("isLeft, isRight", () => {
    it("Left", () => {
      const left = Either.left("foo");

      expect(Either.isLeft(left)).toBe(true);
      expect(Either.isRight(left)).toBe(false);
    });

    it("Right", () => {
      const right = Either.right(42);

      expect(Either.isLeft(right)).toBe(false);
      expect(Either.isRight(right)).toBe(true);
    });
  });

  describe("findLeft, findRight", () => {
    it("Left", () => {
      const left = Either.left("foo");
      const foundLeft = Either.findLeft(left);
      const foundRight = Either.findRight(left);

      expect(Option.equal(foundLeft, Option.some("foo"))).toBe(true);
      expect(Option.equal(foundRight, Option.none())).toBe(true);
    });

    it("Right", () => {
      const right = Either.right(42);
      const foundLeft = Either.findLeft(right);
      const foundRight = Either.findRight(right);

      expect(Option.equal(foundLeft, Option.none())).toBe(true);
      expect(Option.equal(foundRight, Option.some(42))).toBe(true);
    });
  });

  describe("getLeft, getRight", () => {
    it("Left", () => {
      const left = Either.left("foo");

      expect(Either.getLeft(left)).toBe("foo");
      expect(() => Either.getRight(left)).toThrow();
    });

    it("Right", () => {
      const right = Either.right(42);

      expect(() => Either.getLeft(right)).toThrow();
      expect(Either.getRight(right)).toBe(42);
    });
  });

  describe("equal", () => {
    it("Left", () => {
      const left1 = Either.left("foo");
      const left2 = Either.left("foo");
      const left3 = Either.left("bar");
      const right = Either.right("foo");

      const isSameLength = (a: string, b: string) => a.length === b.length;

      expect(Either.equal(left1, left2)).toBe(true);
      expect(Either.equal(left1, left3)).toBe(false);
      expect(Either.equal(left1, left3, isSameLength)).toBe(true);
      expect(Either.equal(left1, right)).toBe(false);
    });

    it("Right", () => {
      const right1 = Either.right(42);
      const right2 = Either.right(42);
      const right3 = Either.right(7);
      const left = Either.left(42);

      const isDivisor = (a: number, b: number) => a % b === 0;

      expect(Either.equal(right1, right2)).toBe(true);
      expect(Either.equal(right1, right3)).toBe(false);
      expect(Either.equal(right1, right3, undefined, isDivisor)).toBe(true);
      expect(Either.equal(right1, left)).toBe(false);
    });
  });

  describe("compare", () => {
    it("Left", () => {
      const left1 = Either.left("foo");
      const left2 = Either.left("foo");
      const left3 = Either.left("bar");
      const right = Either.right("foo");

      const compareLength = (a: string, b: string) => a.length - b.length;

      expect(Either.compare(left1, left2)).toBe(0);
      expect(Either.compare(left1, left3)).toBe(1);
      expect(Either.compare(left1, left3, compareLength)).toBe(0);

      expect(Either.compare(left1, right)).toBe(-1);
      expect(Either.compare(right, left1)).toBe(1);
    });

    it("Right", () => {
      const right1 = Either.right(42);
      const right2 = Either.right(42);
      const right3 = Either.right(7);

      const mod = (a: number, b: number) => a % b;

      expect(Either.compare(right1, right2)).toBe(0);
      expect(Either.compare(right1, right3)).toBe(1);
      expect(Either.compare(right1, right3, undefined, mod)).toBe(0);
    });
  });

  describe("mapLeft, mapRight", () => {
    it("Left", () => {
      const left = Either.left("foo");
      const mappedLeft = Either.mapLeft((left) => left.endsWith("a"), left);
      const mappedRight = Either.mapRight((right) => 7, left);

      expect(Either.equal(mappedLeft, Either.left(false))).toBe(true);
      expect(Either.equal(mappedRight, left)).toBe(true);
    });

    it("Right", () => {
      const right = Either.right(42);
      const mappedLeft = Either.mapLeft((left) => false, right);
      const mappedRight = Either.mapRight((right) => right.toFixed(1), right);

      expect(Either.equal(mappedLeft, right)).toBe(true);
      expect(Either.equal(mappedRight, Either.right("42.0"))).toBe(true);
    });
  });

  describe("map", () => {
    it("Left", () => {
      const left = Either.left("foo");
      const mapped = Either.map(
        (left) => left.endsWith("a"),
        (right) => 7,
        left,
      );

      expect(Either.equal(mapped, Either.left(false))).toBe(true);
    });

    it("Right", () => {
      const right = Either.right(42);
      const mapped = Either.map(
        (left) => false,
        (right) => right.toFixed(1),
        right,
      );

      expect(Either.equal(mapped, Either.right("42.0"))).toBe(true);
    });
  });

  describe("fold", () => {
    it("Left", () => {
      const left = Either.left("foo");
      const folded = Either.fold(
        (left) => Symbol(left.substring(1)),
        (right) => Symbol(),
        left,
      );

      expect(folded.description).toBe("oo");
    });

    it("Right", () => {
      const right = Either.right(42);
      const folded = Either.fold(
        (left) => Symbol(),
        (right) => Symbol(right.toFixed(1)),
        right,
      );

      expect(folded.description).toBe("42.0");
    });
  });

  describe("iter", () => {
    it("Left", () => {
      const left = Either.left("foo");
      const leftMock = vi.fn();
      const rightMock = vi.fn();
      Either.iter(
        (left) => leftMock(left),
        (right) => rightMock(),
        left,
      );

      expect(leftMock).toBeCalledWith("foo");
      expect(rightMock).not.toBeCalled();
    });

    it("Right", () => {
      const right = Either.right(42);
      const leftMock = vi.fn();
      const rightMock = vi.fn();
      Either.iter(
        (left) => leftMock(),
        (right) => rightMock(right),
        right,
      );

      expect(leftMock).not.toBeCalled();
      expect(rightMock).toBeCalledWith(42);
    });
  });

  describe("forAll", () => {
    it("Left", () => {
      const left = Either.left("foo");
      const result = Either.forAll(
        (left) => left.endsWith("a"),
        (right) => true,
        left,
      );

      expect(result).toBe(false);
    });

    it("Right", () => {
      const right = Either.right(42);
      const result = Either.forAll(
        (left) => true,
        (right) => right.toFixed() === "bar",
        right,
      );

      expect(result).toBe(false);
    });
  });
});
