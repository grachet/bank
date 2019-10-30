import {storage} from "../config/firebase";

export const putStorage = (file, path) => {
  storage.ref(path).put(file).then(snapshot => {
    console.log('Uploaded a blob or file!');
  });
};

export const putIdCard = (file, id) => {
  putStorage(file, "idCard/" + id)
};

export const getIdCardUrl = (id, callback) => {
  storage.ref("idCard/" + id + ".pdf").getDownloadURL().then(
    callback
  ).catch(function (error) {
    console.error(error)
  });
};

export const getIdCard = (id, callback) => {
  getIdCardUrl(id,(url) => {
    fetch(url)
      .then(res => res.blob()) // Gets the response and returns it as a blob
      .then(blob => {
        let file = new File([blob],  "idCard.pdf");
        console.log("file", file);
        callback(file);
      });
  })
};
