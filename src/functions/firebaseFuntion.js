import {database} from "../config/firebase";

export const writeDatabase = (object, path) => {
  database.ref(path).set(object);
};


export const writeAccount = (object, id) => {
  writeDatabase(object, "accounts/" + id)
};

export const deleteDatabaseObject = (path) => {
  database.ref(path).remove().then(() => console.log("account removed " + path));
};

export const deleteAccount = (id) => {
  deleteDatabaseObject("accounts/" + id)
};

export const listenAccount = (id, callback) => {
  listenDatabase("accounts/" + id, callback)
};

export const listenDatabase = (path, callback) => {
  database.ref(path).on('value', (snap) => callback(snap.val()))
};

export function listenAllAccounts(callback) {
  listenDatabase("accounts", callback)
}

export function getAllAccounts(callback) {

  database.ref("accounts").once('value').then(snap => callback(snap.val()))
}
