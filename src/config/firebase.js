import { database as fdatabase, auth, storage as fstorage, initializeApp } from "firebase";

import FirebaseConfig from "./firebaseConfig";

initializeApp(FirebaseConfig);

export const database = fdatabase();
export const databaseRef = database.ref();
export const accountRef = databaseRef.child("account");
export const authRef = auth();
export const storage = fstorage();
