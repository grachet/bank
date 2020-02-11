import { authRef, database } from "../config/firebase"
import { writeAccount } from "./firebaseFuntion";

export const signOut = (uid, setAccount) => {
  authRef.signOut().then(function () {
    console.log("sign out");
    database.ref("accounts/" + uid).off();
    database.ref("accounts").off();
    setAccount(null)
  }).catch(function (error) {
    console.error(error)
  });
};

export const fetchUser = (callback) => {
  authRef.onAuthStateChanged(user => {
    callback && callback(user);
  });
};

export const signInAccount = (email, password, callback, errorCallback) => {
  authRef.signInWithEmailAndPassword(email, password).then(rep => {
    callback(rep.user.uid);
  }).catch(function (error) {
    // Handle Errors here.
    var errorMessage = error.message;
    errorCallback(errorMessage)
  });
};

export const createAccount = (email, password, info, callback, errorCallback) => {
  authRef.createUserWithEmailAndPassword(email, password).then(user => {
    let RIB = "FR" + getRandomNumberString(10) + getRandomString(11) + getRandomNumberString(2);
    let account = { email, ...info, id: user.user.uid, RIB };
    writeAccount(account, account.id);
    callback(account.id);
  }).catch(function (error) {
    // Handle Errors here.
    var errorMessage = error.message;
    errorCallback(errorMessage)
  });
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomNumberString(length) {
  let nb = "";
  for (let i = 0; i < length; i++) {
    nb += getRandomInt(10)
  }
  return nb
}

export function getRandomString(length) {
  let values = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789012345678901234567890123456789012345678901234567892345678901234567890123456789";
  let nb = "";
  for (let i = 0; i < length; i++) {
    nb += values[getRandomInt(values.length - 1)]
  }
  return nb
}



