import * as firebase from "firebase";

import {FirebaseConfig} from "../config/keys";

firebase.initializeApp(FirebaseConfig);

export const database = firebase.database();
export const databaseRef = firebase.database().ref();
export const accountRef = databaseRef.child("account");
export const authRef = firebase.auth();
export const  storage = firebase.storage();
