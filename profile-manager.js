// Initialize Firebase
var config = {
  apiKey: "AIzaSyBdrrWwW_D_iQRtUHPsJ0P_AFE852haY-0",
  authDomain: "sacodatabase.firebaseapp.com",
  databaseURL: "https://sacodatabase.firebaseio.com",
  storageBucket: "sacodatabase.appspot.com",
  messagingSenderId: "327255697209"
};
firebase.initializeApp(config);

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

var uid = getQueryVariable("id");
var profile_pic_url = "Images/UnknownProfile.png";
var bio = "This user hasn't written a bio yet.";
var rank = 0;
var votes = 0;
var name = "";
var credits = 0;
var badges = [];
var positions = [];
var joindate = "01 JAN 2017";


console.log('users/' + uid);
firebase.database().ref('users/' + uid).once('value').then(function(snapshot) {
  profile_pic_url = snapshot.val().profile_pic_url;
  bio = snapshot.val().bio;
  rank = snapshot.val().rank;
  votes = snapshot.val().votes;
  name = snapshot.val().username;
  credits = snapshot.val().credits;
  joindate = snapshot.val().joindate;

  firebase.database().ref('users/' + uid + '/badges').once('value').then(function(snap) {
    snap.forEach(function(badge) {
      console.log("key " + badge.key + " desc " + badge.val());
      badges.push({name: badge.key, desc: badge.val()});
    });

    console.log("badges: " + badges);
  });
  firebase.database().ref('users/' + uid + '/positions').once('value').then(function(snap) {
    snap.forEach(function(position) {
      console.log("key " + position.key + " desc " + position.val());
      positions.push({name: position.key, desc: position.val()});
    });

    console.log("positions: " + positions);

    var text = "";

    for(var i = 0; i < positions.length; i ++) {
      var p = positions[i];
      var name = p.name;
      var desc = p.desc;
      console.log(name + " : " + desc);

      if(i > 0) {
        text += ", " + name;
      } else {
        text += "POSITIONS: " + name;
      }
    }

    $("#positions").text(text);
  });

  $("#profilepic").attr("src", profile_pic_url);
  $("#bio").text(bio);
  $("#votes").text(votes);
  $("#name").text(name);
  $("#credits").text(credits);
  $("#joindate").text(joindate);

});



firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    //User is signed in
    console.log("There is a user signed in.");

    var profilepic_url = "Images/UnknownProfile.png";
    console.log('users/' + user.uid);
    firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot) {
      profilepic_url = snapshot.val().profile_pic_url;
      $("#profile-pic").attr("src", profilepic_url);
      $("#profile-link").attr("href", "file:///Users/josephuyemura/Documents/SACO/profiles.html?id=" + user.uid);
    });

  } else {

    //Show the sign in stuff
    $("#profile-pic").attr("style", "display:none;");
    $("#profile-link").css({
      "width": "90px",
      "height": "40px",
      "border-radius": "4px",
      "text-align": "center",
      "text-decoration": "none",
      "line-height": "40px",
      "position": "fixed",
      "right": "55px",
      "top": "160px",
      "z-index": "55",
      "background-color": "#FFF",
      "color": "#000"
    });
    $("#profile-link").text("Log In");
    $("#profile-link").attr("href", "file:///Users/josephuyemura/Documents/SACO/sign-in.html");
  }
});
