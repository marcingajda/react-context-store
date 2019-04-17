import * as React from "react";
import {useStore} from "../../../lib";

import { INCREMENT, DECREMENT } from "../store/numbers.store";

import { flagsContextStore } from "../store/flags.store";
import { numbersContextStore } from "../store/numbers.store";

export const Buttons: React.FC<any> = () => {
  const [flagsState, setFlags] = useStore(flagsContextStore);
  const [, dispatchNumbersAction] = useStore(numbersContextStore);

  const switchFlag = () => {
    setFlags({ working: !flagsState.working });
  };

  const incrementCounter = () => {
    dispatchNumbersAction(INCREMENT);
  };

  const decrementCounter = () => {
    dispatchNumbersAction(DECREMENT);
  };
  return (
    <section className="buttons">
      <button onClick={switchFlag}>Switch FLAG</button>
      <button onClick={incrementCounter}>COUNTER + 1</button>
      <button onClick={decrementCounter}>COUNTER - 1</button>
    </section>
  );
};
