import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { createStore, StoreProvider, useStore } from '../src';

let store;
let storeWithReducer;

function PirateDinnerComponent(props) {
  const [state, updaterOrDispatch] = useStore(props.store);

  const changeDrink = () => {
    updaterOrDispatch({ drink: 'rum' });
  };

  const dispatchDiet = () => {
    updaterOrDispatch('START_DIET');
  };

  return (
    <div>
      <span data-testid="food">{state.food}</span>
      <span data-testid="drink">{state.drink}</span>
      <button data-testid="changeDrink" onClick={changeDrink}>
        Change Drink
      </button>
      <button data-testid="dispatchDiet" onClick={dispatchDiet}>
        Dispatch Diet
      </button>
    </div>
  );
}

const initialState = {
  food: 'meat',
  drink: 'whiskey',
};

const reducer = (state, action) => {
  if (action === 'START_DIET') {
    return {
      ...state,
      food: 'fruits',
    };
  }

  return { ...state };
};

afterEach(cleanup);

describe('StoreProvider', () => {
  beforeEach(() => {
    store = createStore(initialState);
    storeWithReducer = createStore(initialState, reducer);
  });

  it('should allow to use the store in children components', () => {
    const { getByTestId } = render(
      <StoreProvider store={store}>
        <PirateDinnerComponent store={store} />
      </StoreProvider>,
    );

    expect(getByTestId('food').textContent).toBe('meat');
    expect(getByTestId('drink').textContent).toBe('whiskey');
  });

  it('should allow to update the store', () => {
    const { getByTestId } = render(
      <StoreProvider store={store}>
        <PirateDinnerComponent store={store} />
      </StoreProvider>,
    );

    fireEvent.click(getByTestId('changeDrink'));

    expect(getByTestId('food').textContent).toBe('meat');
    expect(getByTestId('drink').textContent).toBe('rum');
  });

  it('should allow to update store with reducer', () => {
    const { getByTestId } = render(
      <StoreProvider store={storeWithReducer}>
        <PirateDinnerComponent store={storeWithReducer} />
      </StoreProvider>,
    );

    fireEvent.click(getByTestId('dispatchDiet'));

    expect(getByTestId('food').textContent).toBe('fruits');
    expect(getByTestId('drink').textContent).toBe('whiskey');
  });
});
