import {FETCH_ACCOUNT, TOGGLE_THEME} from './action.types'
import {
  authRef,
  EmailProvider
} from "../../config/firebase";

export function toggleTheme() {
  return {
    type: TOGGLE_THEME,
  }
}

export const fetchAccount = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_ACCOUNT,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_ACCOUNT,
        payload: "notConnected"
      });
    }
  });
};


export const signIn = (provider) => dispatch => {
      // authRef
      //   .signInWithPopup(GoogleProvider)
      //   .then(result => {
      //     firebase.database().ref('users/' + result.user.uid).set({
      //       name: (result.user.email || result.user.displayName) + " (google)",
      //       uid: result.user.uid
      //     });
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};
