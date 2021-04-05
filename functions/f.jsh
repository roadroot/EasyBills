var admin = require("firebase-admin");

var serviceAccount = require("/home/redroot/Downloads/main-nucleus-309421-firebase-adminsdk-dpbx4-1f4870549d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const doc = admin.firestore().collection("Communes").doc(7);
doc.set({a: 2});
