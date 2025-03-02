# Overview

The _createChain_ function provides a way to create and manage a chain of responsibility by linking multiple _Handler<T>_ instances. It returns a new _Handler<T>_ that represents the entire chain, allowing sequential processing of data through all handlers.

# Goals

The main goal of creating the library is to create a dynamic chain of responsibilities in the Typescript language.

# Behavior

## Chain construction

```js
createChain(A, B, C); // Creates chain: A → B → C
```

## Add handler

```js
chain.setNext(D); // Chain becomes: A → B → C → D
```

# Processing Flow

The chain's handle method initiates processing from the first handler in the chain. Each handler executes its logic and passes results to the next handler.

# Edge cases

- Empty chains return null on handle() calls
- Single-handler chains execute only that handler

# Example of usage

```js
import { createHandler, createChain } from "./handler";

// Create individual handlers
const doubleHandler = createHandler < number > ((n) => n * 2);
const addFiveHandler = createHandler < number > ((n) => n + 5);
const logHandler =
  createHandler <
  number >
  ((n) => {
    console.log("Current value:", n);
    return n;
  });

// Create chain: double → addFive → log
const numberChain = createChain(doubleHandler, addFiveHandler, logHandler);

// Execute chain
const result = numberChain.handle(3);
// Console: "Current value: 11"
// result: 11
```
