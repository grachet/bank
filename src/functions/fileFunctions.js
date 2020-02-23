import { storage } from "../config/firebase";

export const putStorage = (file, path) => {
  storage.ref(path).put(file).then(snapshot => {
    console.log('Uploaded a blob or file!');
  });
};

export const putIdCard = (file, id) => {
  putStorage(file, "idCard/" + id)
};

export const putSignature = (file, id) => {
  putStorage(file, "signature/" + id)
};

export async function getFileUrl(path) {
  // path = "idCard/" + id + ".pdf"
  try {
    return await storage.ref(path).getDownloadURL();
  } catch (e) {
    console.error(e)
    return null
  }
};

export async function getFile(path, name) {
  // path = "signature/ idCard/" + id + ".pdf" 
  try {
    let url = await getFileUrl(path);
    if (!url) {
      return null
    }
    let rep = await fetch(url);
    let blob = await rep.blob();
    return new File([blob], name || path.split("/").join("_"));
  } catch (e) {
    console.error(e)
    return null
  }
};
