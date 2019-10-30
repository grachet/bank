import {storage} from "../config/firebase";

export const putStorage = (file, path) => {
  storage.ref(path).put(file).then(snapshot => {
    console.log('Uploaded a blob or file!');
  });
};

export const putIdCard = (file, id) => {
  putStorage(file, "idCard/" + id)
};
