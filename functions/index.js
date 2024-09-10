const functions = require("firebase-functions");

// A simple HTTPS cloud function
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase!");
});
