// Initialize Firebase
var config = {
  apiKey: "AIzaSyBdrrWwW_D_iQRtUHPsJ0P_AFE852haY-0",
  authDomain: "sacodatabase.firebaseapp.com",
  databaseURL: "https://sacodatabase.firebaseio.com",
  storageBucket: "sacodatabase.appspot.com",
  messagingSenderId: "327255697209"
};
firebase.initializeApp(config);


firebase.auth().onAuthStateChanged(function(user) {
  if(user) {

    //User is signed in
    console.log("There is a user signed in.");

    var profile_pic_url = "Images/UnknownProfile.png";
    console.log('users/' + user.uid);
    firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot) {
      profile_pic_url = snapshot.val().profile_pic_url;
      $("#profile-pic").attr("src", profile_pic_url);
      $("#profile-link").attr("href", "file:///Users/josephuyemura/Documents/SACO/profiles.html?id=" + user.uid);
    });

  } else {

    //Show the sign in stuff

  }
});
