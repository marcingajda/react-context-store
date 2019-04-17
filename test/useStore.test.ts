import { renderHook } from 'react-hooks-testing-library';
import { useStore } from '../src';
import { createStore } from '../src';

describe('useStore', () => {
  it('should throw an error when used outside StoreProvider or StoreComposer', () => {
    const store = createStore({
      pirates: ['Captain Jack Sparrow', 'Captain Hook'],
    });

    // Make React quite about errors
    // eslint-disable-next-line
    console.error = () => {};

    const {
      result: { error },
    } = renderHook(() => useStore(store));

    expect(error.message).toEqual('Did you use the StoreComposer or StoreProvider?');
  });
});
