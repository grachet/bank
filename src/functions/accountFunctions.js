import {authRef} from "../config/firebase"
import {writeAccount} from "./firebaseFuntion";

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
  authRef.createUserWithEmailAndPassword(email, password).then(user => {
    let account = {email, ...info, id: user.user.uid};
    writeAccount(account, account.id);
    callback(account);
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    errorCallback(errorMessage)
  });
};




