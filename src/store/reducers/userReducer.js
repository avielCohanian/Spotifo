const INITIAL_STATE = {
  currUser: {},
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_LOGIN_USER':
      return {
        ...state,
        currUser: { ...action.currUser },
      };

    default:
      return state;
  }
}
