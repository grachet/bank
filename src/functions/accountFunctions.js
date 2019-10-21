import {authRef} from "../config/firebase"

export const signOut = () => {
  authRef.signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
};

export const signInAccount = (email, password, callback, errorCallback) => {
  authRef.signInWithEmailAndPassword(email, password).then(account => {
    callback(account);
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    errorCallback(errorMessage)
  });
};

export const createAccount = (email, password, info, callback, errorCallback) => {
  authRef.createUserWithEmailAndPassword(email, password).then(account => {
    callback(account);
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    errorCallback(errorMessage)
  });
};




