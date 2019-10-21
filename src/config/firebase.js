import * as firebase from "firebase";

import {FirebaseConfig} from "../config/keys";

firebase.initializeApp(FirebaseConfig);

export const databaseRef = firebase.database().ref();
export const projectsRef = databaseRef.child("projects");
export const authRef = firebase.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const GithubProvider = new firebase.auth.GithubAuthProvider();
export const FacebookProvider = new firebase.auth.FacebookAuthProvider();
export const usersRef = databaseRef.child("users");

