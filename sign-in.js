// Initialize Firebase
var config = {
  apiKey: "AIzaSyBdrrWwW_D_iQRtUHPsJ0P_AFE852haY-0",
  authDomain: "sacodatabase.firebaseapp.com",
  databaseURL: "https://sacodatabase.firebaseio.com",
  storageBucket: "sacodatabase.appspot.com",
  messagingSenderId: "327255697209"
};
firebase.initializeApp(config);
var ref = new Firebase("https://sacodatabase.firebaseio.com");
var db = firebase.database();

function authHandler(error, authData) {
  if (error) {
    console.log("Login Failed! ", error);
  } else {
    console.log("Authenticated successfully with payload: ", authData);
  }
}

function signin() {
  var email = $("#email").val();
  var password = $("#password").val();

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
    window.location.replace("file:///Users/josephuyemura/Documents/SACO/index.html");
  }).catch(function(error) {
    var errorcode = error.code;
    var errormessage = error.message;

    switch (errorcode) {
      case "auth/invalid-email":
        alert("That, my friend, is not a valid email.");
        break;
      case "auth/user-disabled":
        alert("Woah there, hold your horses, you're account has been disabled.");
        break;
      case "auth/user-not-found":
        alert("Try again, we didn't find an user for that email.");
        break;
      case "auth/wrong-password":
        alert("Whoops, I think you have the wrong password.");
        break;
      default:
        alert(errormessage);
    }

    console.log("Error while logging in. Error has code: " + errorcode + ", and message: " + errormessage);
  });

};
