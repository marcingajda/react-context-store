import { Context, createContext, Dispatch, Reducer, ReducerAction } from 'react';

export interface PartialState<S extends object> {
  value: S;
}

export type State<S extends object> = PartialState<S> &
  ({
    dispatch: Dispatch<ReducerAction<Reducer<S, any>>>;
  });

export interface CreateStoreFunction {
  <S extends object>(initial: S, reducer?: Reducer<S, any>): Store<S>;
}

export interface Store<S extends object = any> {
  Context: Context<State<S> | PartialState<S>>;
  reducer?: Reducer<S, any>;
  initial: S;
}

export const createStore: CreateStoreFunction = (initial, reducer) => {
  const contextState: PartialState<any> = { value: initial };
  const Context = createContext(contextState);

  return {
    Context,
    reducer,
    initial,
  };
};
