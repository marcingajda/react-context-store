import * as React from 'react';
import { FC, ReactNode, ReactElement } from 'react';

import { StoreProvider } from './StoreProvider';
import { Store } from './store';

interface WrapInProviderFunction {
  (wrapped: ReactElement, store: Store): ReactElement;
}

export type ComposerComponent = FC<{
  stores: Store[];
  children: ReactNode;
}>;

const wrapInProvider: WrapInProviderFunction = (children, store) => {
  return <StoreProvider store={store}>{children}</StoreProvider>;
};

export const StoreComposer: ComposerComponent = ({ stores, children }) => {
  return stores.reduce(wrapInProvider, children as ReactElement) as ReactElement;
};
