export const uiTypes = {
  TOGGLE_LOADING: 'UI_TOGGLE_LOADING',
  ERROR: 'UI_ERROR',
};

const initalState = {
  loading: false,
  error: null,
};

function uiReducer(state = initalState, action) {
  switch (action.type) {
    case uiTypes.TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    case uiTypes.ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export default uiReducer;
