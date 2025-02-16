import { Handler } from "./handler";

type ChainParameters<T> = {
  /**
   * Whether chain has no handlers
   */
  isEmpty: boolean;
  /**
   * Reference to last handler in a chain
   */
  currentHandler: Handler<T> | null;
};

/**
 *
 * @param handlers handlers to form initial chain
 * @returns first handler in chain
 */
export function createChain<T>(...handlers: Handler<T>[]): Handler<T> {
  let parameters: ChainParameters<T> = {
    isEmpty: true,
    currentHandler: null,
  };

  for (const handler of handlers) {
    updateHandlers(parameters, handler);
  }

  const handle = (options: T) => {
    return parameters.isEmpty
      ? null
      : parameters.currentHandler.handle(options);
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
  if (chainParameters.isEmpty) {
    chainParameters.currentHandler = handler;
    chainParameters.isEmpty = false;
    return;
  }

  chainParameters.currentHandler.setNext(handler);
  chainParameters.currentHandler = handler;
  return;
}
