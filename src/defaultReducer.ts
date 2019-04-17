interface DefaultReducerType {
  <S extends object, A extends object>(state: S, action: A): S & A;
}

export const defaultReducer: DefaultReducerType = (state, action) => {
  return {
    ...state,
    ...action,
  };
};
