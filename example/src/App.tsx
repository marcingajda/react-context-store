import * as React from "react";

import { Buttons } from "./Components/Buttons";
import { Flag } from "./Components/Flag";
import { Counter } from "./Components/Counter";

import { StoreComposer } from "../../lib";

import { flagsContextStore } from "./store/flags.store";
import { numbersContextStore } from "./store/numbers.store";

const stores = [
  flagsContextStore,
  numbersContextStore,
];

export const App: React.FC<any> = () => {
  return (
    <div className="app">
      <StoreComposer stores={stores}>
        <h1 className="title">
          React Hooked Store Example
        </h1>
        <Flag />
        <Counter />
        <Buttons />
      </StoreComposer>
    </div>
  );
};
