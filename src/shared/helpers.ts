export const equalFn = <T>(v1: T, v2: T): boolean => v1 === v2;
export const compareFn = <T>(v1: T, v2: T): number =>
  v1 === v2 ? 0 : v1 > v2 ? 1 : -1;

export const throwError = (message?: string): never => {
  throw new Error(message);
};
