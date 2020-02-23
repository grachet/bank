import { database } from "../config/firebase";

export const writeDatabase = (object, path) => {
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

export async function deleteAccount(id) {

  deleteDatabaseObject("accounts/" + id);

  // let user = admin.auth().getUser(id);

  // console.log(id, user)

  // user.delete().then(function() {
  //   // User deleted.
  // }).catch(function(error) {
  //   // An error happened.
  // });

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
