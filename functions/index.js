const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");

const app = express();
admin.initializeApp({
  credential: admin.credential.cert(require("./permissions.json")),
  databaseURL: "https://fb-api.firebaseio.com",
});

app.get("/hello-world", (req, res) => {
  return res.status(200).json({ message: "Hello world" });
});

app.use(require('./routes/ComidasMEX.routes'))

exports.app = functions.https.onRequest(app);
