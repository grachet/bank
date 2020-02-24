// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// deleting functions 
exports.userDidDeleted = functions.database.ref('/accounts/{accountId}').onDelete((snapshot, context) => {

    let uid = snapshot.key;

    if (uid) {
        admin.auth().deleteUser(uid)
    }
});