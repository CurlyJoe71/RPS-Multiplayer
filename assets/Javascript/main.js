var config = {
    apiKey: "AIzaSyCgy1k_47eHRfnN-7G95VCrf9cA3zAi6c8",
    authDomain: "rps-multiplayer-fd60d.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-fd60d.firebaseio.com",
    projectId: "rps-multiplayer-fd60d",
    storageBucket: "rps-multiplayer-fd60d.appspot.com",
    messagingSenderId: "269715592579"
};
firebase.initializeApp(config);

var displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData, avatarURL, div, images, avatarURL, avatar, playerOne, playerTwo;
var database = firebase.database();
var user = firebase.auth().currentUser;

// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         // User is signed in.
//         displayName = user.displayName;
//         email = user.email;
//         emailVerified = user.emailVerified;
//         photoURL = user.photoURL;
//         isAnonymous = user.isAnonymous;
//         uid = user.uid;
//         providerData = user.providerData;
//         // ...
//         console.log(displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData);

//     } 
//     else {
//         // User is signed out.
//         // ...
//     }
// });

var updateDatabase = () => {
    console.log('user is: ' + user);
    console.log('displayname is: ' + displayName);

    if (firebase.database().ref('connections')) {
        firebase.database().ref('playertwo').set({
            playerName: displayName,
            avatar: photoURL
        })
    }
    else {
        firebase.database().ref('playerone').set({
            playerName: displayName,
            avatar: photoURL
        });
    }
};

var photoArray = ['https://vignette.wikia.nocookie.net/simpsons/images/5/57/Lisa_Simpson2.png/revision/latest?cb=20180319000458', 'https://vignette.wikia.nocookie.net/simpsons/images/8/89/Maggie.png/revision/latest?cb=20090115172358', 'https://vignette.wikia.nocookie.net/simpsons/images/6/65/Bart_Simpson.png/revision/latest?cb=20180319061933', 'https://vignette.wikia.nocookie.net/simpsons/images/4/4d/MargeSimpson.png/revision/latest?cb=20180314071936', 'https://vignette.wikia.nocookie.net/simpsons/images/0/02/Homer_Simpson_2006.png/revision/latest?cb=20091207194310'];

var renderAvatars = () => {
    for (i = 0; i < photoArray.length; i++) {
        div = $('<div>');
        images = $('<img>');
        var source = (photoArray[i]);
        images.attr('src', source);
        div.append(images).attr('class', 'image');

        $('#avatarSelection').prepend(div);
    };
};


//***CONNECTION CODE***//
var connectionsRef = database.ref('/connections');
console.log(connectionsRef);

var connectedRef = database.ref('.info/connected');

connectedRef.on('value', function (snap) {
    if (connectionsRef.length === 2) {
        alert("There are already two players playing. Try again later.");
    }

    else if (snap.val()) {
        var con = connectionsRef.push(true);
        console.log(connectionsRef);
        con.onDisconnect().remove();
    }
});
//***END OF CONNECTION CODE***/

var updatePic = () => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
        photoURL: avatarURL
    }).then(function () {
        // Update successful.
    }).catch(function (error) {
        // An error happened.
    });
    console.log(user);
}

var updatePhoto = () => {
    avatarURL = avatar.attr('src');
    console.log(avatarURL);
    updatePic();
};

firebase.database().ref().on('value', function(snap){
    console.log(snap.val());

    if(snap.child('playerone').exists()) {
        console.log('playerone exists');
        firebase.database().ref('playertwo').set({
            playerName: displayName,
            avatar: photoURL
        });
        playerTwo = $('<span>Hello, ' + displayName + '! You\'re Player Two!</span>');
        $('#playerTwoDisplay').append(playerTwo);
    }
    else {
        firebase.database().ref('playerone').set({
            playerName: displayName,
            avatar: photoURL
        });
        playerOne = $('<span>Hello, ' + displayName + '! You\'re Player One!</span>');
        $('#playerOneDisplay').append(playerOne);
    }
});


$(document).ready(function () {
    renderAvatars();
    $('img').on('click', function () {
        console.log($(this));
        avatar = $(this)
        updatePhoto();
    }); //end of click event
});

//I need to take the curent user data and just move it over to the database.

//I ended up getting rid of the auth part of the app.


// If there isn't anything at child index 0, then all of this is player one information.
//The next person to logs in, but if there is already a spot at index 0, then get pushed to index 1, and then their information is player two information.
// 