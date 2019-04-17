import * as React from "react";
import { useStore } from "../../../lib";
import { numbersContextStore } from "../store/numbers.store";

export const Counter: React.FC<any> = () => {
  const [numbersState] = useStore(numbersContextStore);

  return (
    <section className="terminal">
      <strong>Counter: </strong> {numbersState.counter}
    </section>
  );
};
