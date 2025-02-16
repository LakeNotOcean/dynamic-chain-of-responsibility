export type Handler<T> = {
  /**
   * Processes input and optionally passes it to the next handler
   * @param options - Input data of generic type T
   * @returns Processed output of type T
   */
  handle: (options: T) => T;
  /**
   * Add link to the next handler in the chain
   * @param handler - Next handler in the sequence
   */
  setNext: (handler: Handler<T>) => void;
};

/**
 * Creates handler instances from the given function.
 * @param handleFunction processing function
 * @returns
 */
export function createHandler<T>(
  handleFunction: (options: T) => T
): Handler<T> {
  let next: Handler<T> | null = null;

  const handle = (options: T) => {
    const result = handleFunction(options);
    if (!next) {
      return result;
    }
    return next.handle(result);
  };

  const setNext = (handler: Handler<T>) => {
    next = handler;
  };
  return {
    handle,
    setNext,
  };
}
