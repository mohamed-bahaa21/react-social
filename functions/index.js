const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();

admin.initializeApp();

const firebaseConfig = {
  apiKey: "AIzaSyBFZdmgXpL5Tf73926vuS7StQYyHM6GoNA",
  authDomain: "react-social-47b71.firebaseapp.com",
  databaseURL: "https://react-social-47b71.firebaseio.com",
  projectId: "react-social-47b71",
  storageBucket: "react-social-47b71.appspot.com",
  messagingSenderId: "513475234480",
  appId: "1:513475234480:web:7135c12df34e421ada0975",
  measurementId: "G-286ZM5ZT83",
};

const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

app.post("/signup", (req, res) => {
  const { email, password, confirmPassword, handle } = req.body;
  const newUser = {
    email,
    password,
    confirmPassword,
    handle,
  };

  // TODO: validate data
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

exports.api = functions.https.onRequest(app);
//https://baseurl.com/api/
//change firebase region
// exports.api = functions.region("europe-west1").https.onRequest(app);
