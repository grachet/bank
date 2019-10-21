import {FETCH_PROJECTS,} from './action.types'
import * as firebase from "firebase";

import {projectsRef} from "../../config/firebase";

export const removeProject = removeProjectId => async dispatch => {
  projectsRef.child(removeProjectId).remove();
};

export const fetchProjects = (userId) => async dispatch => {
  projectsRef.orderByChild("users/"+userId).startAt("").on("value", snapshot => {
    dispatch({
      type: FETCH_PROJECTS,
      payload: snapshot.val()
    });
  });
};

export const updateProject = (project, projectId) => async dispatch => {
  firebase.database().ref('projects/' + (projectId || project.projectId)).set(project);
};





