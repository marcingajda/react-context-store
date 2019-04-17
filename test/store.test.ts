import { createStore } from '../src';
import { createContext } from 'react';

describe('createStore', () => {
  test('makes store with initial value', () => {
    const initialValue = {
      job: 'pirate',
    };

    const store = createStore(initialValue);

    expect(store.initial).toBe(initialValue);
    expect(store.reducer).toBeUndefined();
    expect(store.Context).toEqual(
      createContext({
        value: initialValue,
      }),
    );
  });

  test('allow to set a reducer', () => {
    const initialValue = {
      shipStatus: 'docked',
    };

    const simpleReducer = (state, action) => {
      return { ...state, ...action };
    };

    const store = createStore(initialValue, simpleReducer);

    expect(store.initial).toBe(initialValue);
    expect(store.reducer).toBe(simpleReducer);
    expect(store.Context).toEqual(
      createContext({
        value: initialValue,
      }),
    );
  });
});
