

var config = {
    apiKey: "AIzaSyCgy1k_47eHRfnN-7G95VCrf9cA3zAi6c8",
    authDomain: "rps-multiplayer-fd60d.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-fd60d.firebaseio.com",
    projectId: "rps-multiplayer-fd60d",
    storageBucket: "rps-multiplayer-fd60d.appspot.com",
    messagingSenderId: "269715592579"
};
firebase.initializeApp(config);

var displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      displayName = user.displayName;
      email = user.email;
      emailVerified = user.emailVerified;
      photoURL = user.photoURL;
      isAnonymous = user.isAnonymous;
      uid = user.uid;
      providerData = user.providerData;
      // ...
      console.log(displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData);
      var playerOne = $('<span>Hello, ' + displayName + '! You\'re Player One!</span>');
      $('#playerOneDisplay').append(playerOne);
    } else {
      // User is signed out.
      // ...
    }
  });



var database = firebase.database();

var connectionsRef = database.ref('/connections');
console.log(connectionsRef);

var connectedRef = database.ref('.info/connected');

connectedRef.on('value', function (snap) {
    if (snap.numChildren === 2) {
        alert("There are already two players playing. Try again later.");
    }

    else if (snap.val()) {
        var con = connectionsRef.push(true);
        console.log(connectionsRef);
        con.onDisconnect().remove();
    }
});

