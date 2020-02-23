var functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// deleting functions 
exports.userDidDeleted = functions.database.ref('/accounts').onDelete((snapshot, context) => {

    let uid = snapshot.key;

    if (uid) {
        admin.auth().deleteUser(uid)
    }
});