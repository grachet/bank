import {FETCH_ACCOUNT, TOGGLE_THEME} from "../actions/action.types";


export default (state = null, action) => {
  let a = action.payload;
  let user, request, newState, status, success;
  if (a) {
    status = action.status;
    request = status === "REQUEST";
    success = status === "SUCCESS";
  }

  switch (action.type) {
    case TOGGLE_THEME:
      return {...state, darkTheme: !state.darkTheme};
    case FETCH_ACCOUNT:
      return action.payload || null;
    default:
      return state;
  }
};
