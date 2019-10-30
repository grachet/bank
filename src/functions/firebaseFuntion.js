import {database} from "../config/firebase";

export const writeDatabase = (object, path) => {
  database.ref(path).set(object);
};

export const writeAccount = (object, id) => {
  writeDatabase(object, "accounts/" + id)
};

export const listenAccount = (id, callback) => {
  listenDatabase("accounts/" + id, callback)
};

export const listenDatabase = (path, callback) => {
  database.ref(path).on('value', (snap) => callback(snap.val()))
};
