import { defaultReducer } from '../src/defaultReducer';

describe('defaultReducer', () => {
  test('should merge current state with the action', () => {
    const current = {
      type: 'captain',
      age: 50,
      missingBodyParts: {
        leftHand: true,
        rightLeg: true,
      },
    };

    const action = {
      type: 'sailor',
      age: 25,
      missingBodyParts: {},
      placeOfWork: 'foretop',
    };

    const result = defaultReducer(current, action);

    expect(result.type).toBe('sailor');
    expect(result.age).toBe(25);
    expect(result.missingBodyParts).toEqual({});
    expect(result.placeOfWork).toEqual('foretop');
  });
});
