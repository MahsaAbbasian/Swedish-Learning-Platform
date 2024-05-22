// Initialize Firebase
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
firebase.initializeApp(firebaseConfig);

// Reference to the login form
var loginForm = document.getElementById("login-form");

// Handle form submission
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  var email = loginForm["email"].value;
  var password = loginForm["password"].value;

  // Sign in with email and password
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      // Signed in successfully
      var user = userCredential.user;
      console.log("User signed in:", user);
      // Redirect or perform other actions after successful login
    })
    .catch(function (error) {
      // Handle errors
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Login error:", errorMessage);
    });
});
