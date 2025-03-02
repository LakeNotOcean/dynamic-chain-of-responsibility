import { Handler } from "./handler.js";

type ChainParameters<T> = {
  /**
   * Reference to last handler in a chain
   */
  lastHandler: Handler<T> | null;
  /**
   * Reference to first handler in a chain
   */
  firstHandlder: Handler<T> | null;
};

/**
 *
 * @param handlers handlers to form initial chain
 * @returns first handler in chain
 */
export function createChain<T>(...handlers: Handler<T>[]): Handler<T> {
  let parameters: ChainParameters<T> = {
    lastHandler: null,
    firstHandlder: null,
  };

  for (const handler of handlers) {
    updateHandlers(parameters, handler);
  }

  const handle = (options: T) => {
    return parameters.firstHandlder
      ? parameters.firstHandlder.handle(options)
      : null;
  };

  const setNext = (handler: Handler<T>) => {
    updateHandlers(parameters, handler);
  };

  return {
    handle,
    setNext,
  };
}

/**
 * Add next handler to the chain
 * @param chainParameters parameters of the chain
 * @param handler next handler
 * @returns
 */
function updateHandlers<T>(
  chainParameters: ChainParameters<T>,
  handler: Handler<T>
) {
  if (!chainParameters.firstHandlder) {
    chainParameters.firstHandlder = handler;
    chainParameters.lastHandler = handler;
    return;
  }

  chainParameters.lastHandler.setNext(handler);
  chainParameters.lastHandler = handler;
  return;
}
