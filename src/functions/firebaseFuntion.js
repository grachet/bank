import {database} from "../config/firebase";

export const writeDatabase = (object, path) => {
  database.ref(path).set(object);
};

export const writeAccount = (object, id) => {
  writeDatabase(object, "accounts/" + id)
}
