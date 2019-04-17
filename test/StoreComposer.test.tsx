import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { createStore, Store, StoreComposer, useStore } from '../src';

let shipsStore: Store<{ count: number }>;
let barrelsStore: Store<{ count: number }>;

function ShipsComponent() {
  const [ships] = useStore(shipsStore);

  return <div data-testid="ships">{ships.count}</div>;
}

function BarrelsComponent() {
  const [barrels] = useStore(barrelsStore);

  return <div data-testid="barrels">{barrels.count}</div>;
}

function ButtonsComponent() {
  const [ships, updateShips] = useStore(shipsStore);
  const [barrels, updateBarrels] = useStore(barrelsStore);

  const addShips = () => updateShips({ count: ships.count + 10 });
  const addBarrels = () => updateBarrels({ count: barrels.count + 20 });

  return (
    <div>
      <div data-testid="addShips" onClick={addShips}>
        Add Ships
      </div>
      <div data-testid="addBarrels" onClick={addBarrels}>
        Add Barrels
      </div>
    </div>
  );
}

afterEach(cleanup);

describe('StoreComposer', () => {
  beforeEach(() => {
    shipsStore = createStore({
      count: 3,
    });

    barrelsStore = createStore({
      count: 10,
    });
  });

  it('should allow to provide multiple stores', () => {
    const { getByTestId } = render(
      <StoreComposer stores={[shipsStore, barrelsStore]}>
        <ShipsComponent />
        <BarrelsComponent />
      </StoreComposer>,
    );

    expect(getByTestId('ships').textContent).toBe('3');
    expect(getByTestId('barrels').textContent).toBe('10');
  });

  it('should allow to update given store', () => {
    const { getByTestId } = render(
      <StoreComposer stores={[shipsStore, barrelsStore]}>
        <ShipsComponent />
        <BarrelsComponent />
        <ButtonsComponent />
      </StoreComposer>,
    );

    fireEvent.click(getByTestId('addShips'));

    expect(getByTestId('ships').textContent).toBe('13');
    expect(getByTestId('barrels').textContent).toBe('10');

    fireEvent.click(getByTestId('addBarrels'));

    expect(getByTestId('ships').textContent).toBe('13');
    expect(getByTestId('barrels').textContent).toBe('30');
  });

  it('should only render component when it is required', () => {
    const ShipsComponentMock = jest.fn(ShipsComponent) as any;
    const BarrelsComponentMock = jest.fn(BarrelsComponent) as any;

    const { getByTestId } = render(
      <StoreComposer stores={[shipsStore, barrelsStore]}>
        <ShipsComponentMock />
        <BarrelsComponentMock />
        <ButtonsComponent />
      </StoreComposer>,
    );

    expect(ShipsComponentMock).toBeCalledTimes(1);
    expect(BarrelsComponentMock).toBeCalledTimes(1);

    fireEvent.click(getByTestId('addShips'));

    expect(ShipsComponentMock).toBeCalledTimes(2);
    expect(BarrelsComponentMock).toBeCalledTimes(1);

    fireEvent.click(getByTestId('addBarrels'));

    expect(ShipsComponentMock).toBeCalledTimes(2);
    expect(BarrelsComponentMock).toBeCalledTimes(2);
  });
});
