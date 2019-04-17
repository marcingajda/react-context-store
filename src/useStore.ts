import { Store, State } from './store';
import { Dispatch, Reducer, ReducerAction, useContext } from 'react';

export interface UseStoreHook {
  <S extends object>(contextStore: Store<S>): [S, Dispatch<ReducerAction<Reducer<S, any>>>] | never;
}

export const useStore: UseStoreHook = <S extends object>(contextStore) => {
  const { value, dispatch } = useContext(contextStore.Context) as State<S>;

  if (!dispatch) throw Error('Did you use the StoreComposer or StoreProvider?');

  return [value, dispatch];
};
