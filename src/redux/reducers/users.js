import {FETCH_USERS} from "../actions/action.types";

export default (state = null, action) => {

  switch (action.type) {
    case FETCH_USERS:
      return action.payload || null;
    default:
      return state;
  }
};