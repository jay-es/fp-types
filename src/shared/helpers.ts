export const equalFn = <T>(v1: T, v2: T): boolean => v1 === v2;

export const makeNever = (message?: string): never => {
  throw new Error(message);
};
