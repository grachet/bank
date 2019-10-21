import user from "./user";
import projects from "./projects";
import users from "./users";
import {combineReducers} from 'redux';

export default combineReducers({
  user,
  users,
  projects
});
