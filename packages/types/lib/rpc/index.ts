export type RPCMethod<T = any, Args extends Array<unknown> = any[]> = (
  ...args: Args
) => Promise<T> | T;

/**
 * Utility type to exclude specific methods from a type.
 * @template T - The type to exclude methods from.
 * @template OmitKeys - The keys of the methods to exclude.
 */
export type ExcludeMethods<T, OmitKeys extends keyof T> = {
  [K in keyof T as K extends OmitKeys ? never : K]: T[K];
};

/**
 * Type representing the methods of RPCController excluding 'hasMethod' and 'getMethod'.
 */
export type RPCControllerMethods<RPCController extends Record<string, RPCMethod>> =
  ExcludeMethods<RPCController, 'hasMethod' | 'getMethod'>;

export * from './server';