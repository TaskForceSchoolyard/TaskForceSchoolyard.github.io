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

function signup() {
  var email = $("#email").val();
  var password = $("#password").val();
  var name = $("#name").val()

  if(name.length > 4) {
    console.log("email: " + email + ", password: " + password + ", name: " + name);

    var vip = false;
    switch (email) {
      case "joseph.uyemura@wrayeagles.org":
        vip = true;
        break;
      case "ben.rebis@wrayeagles.org":
        vip = true;
        break;
      case "brady.collins@wrayeagles.org":
        vip = true;
        break;
      default:
        vip = false;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
      //User successfully signed up.
      user.displayName = name;

      var datestring = "";
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();

      switch (mm) {
        case 1:
          mm = "JAN"
          break;
        case 2:
          mm = "FEB"
          break;
        case 3:
          mm = "MAR"
          break;
        case 4:
          mm = "APR"
          break;
        case 5:
          mm = "MAY"
          break;
        case 6:
          mm = "JUN"
          break;
        case 7:
          mm = "JUL"
          break;
        case 8:
          mm = "AUG"
          break;
        case 9:
          mm = "SEP"
          break;
        case 10:
          mm = "OCT"
          break;
        case 11:
          mm = "NOV"
          break;
        case 12:
          mm = "DEC"
          break;
        default:
          alert("Please reload the page, something went wrong.");
      }

      if(dd < 10) {
        dd = "0" + dd;
      }

      datestring = dd + " " + mm + " " + yyyy;

      var uid = user.uid;
      firebase.database().ref('users/' + uid).set({
        username: name,
        email: email,
        password: password,
        VIP: vip,
        profile_pic_url: "Images/UnknownProfile.png",
        rank: 0,
        votes: 0,
        credits: 10,
        badges: {
          Joined: "Joined SACO",
        },
        positions: {
          Peasant: "No rights within SACO",
        },
        bio: "This user hasn't written a bio yet!",
        group: "NONE",
        location: "CLASSIFIED",
        code_name: name,
        joindate: datestring
      });

      alert("Great job " + name + "! You signed up successfully!");

      firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        window.location.replace("file:///Users/josephuyemura/Documents/SACO/index.html");
        //Go to home page
      }).catch(function(error) {
        var errorcode = error.code;
        var errormessage = error.message;

        console.log("Error while logging in. Error has code: " + errorcode + ", and message: " + errormessage);
      });
    }).catch(function(error) {
        var errorcode = error.code;
        var errormessage = error.message;

        if(errorcode == "auth/email-already-in-use") {
          alert("Uh oh! This email is already in use!");
        } else if(errorcode == "auth/invalid-email") {
          alert("Uh oh! Please make sure that is a valid email!");
        } else if(errorcode == "auth/operation-not-allowed") {
          alert("Uh oh! Accounts are not being accepted at this time.  Please try again later.");
        } else if(errorcode == "auth/weak-password") {
          alert("Uh oh! Make sure that is a strong enough password, we can't let someone steal your data that easily!");
        } else {
          alert(errormessage);
        }
    });
  } else {
    alert("Please use a valid first and last name.")
  }
};
