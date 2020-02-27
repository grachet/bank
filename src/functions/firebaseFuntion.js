import { database } from "../config/firebase";

export const writeDatabase = (object, path) => {
  console.log(object, path)
  database.ref(path).set(object);
};


export const writeAccount = (object, id) => {
  writeDatabase(object, "accounts/" + id)
};

export async function deleteDatabaseObject(path) {
  try {
    return await database.ref(path).remove();
  } catch (e) {
    console.error(e)
    return e
  }
};

export const makeTransfert = (RIB, ammount, title) => {
  const timestamp = Date.now();
  writeDatabase({ timestamp, RIB, ammount, title }, "transferts/" + timestamp)
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
