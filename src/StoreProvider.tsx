import * as React from 'react';
import { useReducer, FC, ReactNode, ReactElement } from 'react';

import { defaultReducer } from './defaultReducer';
import { Store } from './store';

export type ProviderComponent = FC<{
  store: Store;
  children: ReactNode;
}>;

export const StoreProvider: ProviderComponent = ({ store, children }) => {
  const { reducer, Context, initial } = store;
  const [value, dispatch] = useReducer(reducer || defaultReducer, initial);

  return <Context.Provider value={{ value, dispatch }}>{children}</Context.Provider>;
};
