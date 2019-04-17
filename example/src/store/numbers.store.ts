import { Reducer } from "react";
import { createStore } from "../../../lib";

export const INCREMENT = "increment";
export const DECREMENT = "decrement";

const initialValue = {
  counter: 1
};

const reducer: Reducer<any, string> = (prevState, action) => {
  switch (action) {
    case INCREMENT:
      return {
        ...prevState,
        counter: prevState.counter + 1
      };
    case DECREMENT:
      return {
        ...prevState,
        counter: prevState.counter - 1
      };
    default:
      return {
        ...prevState
      };
  }
};

export const numbersContextStore = createStore(initialValue, reducer);
