var config = {
    apiKey: "AIzaSyCgy1k_47eHRfnN-7G95VCrf9cA3zAi6c8",
    authDomain: "rps-multiplayer-fd60d.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-fd60d.firebaseio.com",
    projectId: "rps-multiplayer-fd60d",
    storageBucket: "rps-multiplayer-fd60d.appspot.com",
    messagingSenderId: "269715592579"
};
firebase.initializeApp(config);

var displayName, photoURL, avatarURL, div, images, avatarURL, avatar, playerOne, playerTwo, playerName, connectionsNumber, playerOneKey, playerTwoKey;
var database = firebase.database();

//***CONNECTION CODE***//
var connectionsRef = database.ref('/connections');
var connectedRef = database.ref('.info/connected');
var playerOneRef = database.ref('/connections/playerOne');
var playerTwoRef = database.ref('/connections/playerTwo');

connectedRef.on('value', function (snap) {
    connectionsRef.once('value').then(function (snap) {
        connectionsNumber = snap.numChildren();
        console.log('number is: ' + connectionsNumber);
    });
    if (snap.val()) {
        if (connectionsNumber === 1) {
            var con = connectionsRef.push({
                playerName: '',
                avatar: ''
             });
             playerOneKey = con.key;
             console.log('playerOneKey is: ' + playerOneKey)
        }
        else {
            var con = connectionsRef.push({
               playerName: '',
               avatar: ''
            });
            playerTwoKey = con.key;
            console.log('playerTwoKey is: ' + playerTwoKey)
        };


        // if (connectionsNumber === 1) {
        //     playerOneRef.set({
        //         playerName: 'testing',
        //         avatar: '',
        //         currentMove: ''
        //     })
        // }
        // else if (connectionsNumber === 2) {
        //     playerTwoRef.set({
        //         playerName: '',
        //         avatar: '',
        //         currentMove: ''
        //     })
        con.onDisconnect().remove();
    }
});
//***END OF CONNECTION CODE***/

//***USING JQUERY UI EFFECT***/
function runEffect() {
    // Run the effect
    $("#effect").hide('bounce', 1000, callback);
};
// Callback function to bring a hidden box back
function callback() {
    setTimeout(function () {
        $("#effect").removeAttr("style").hide().fadeIn();
    }, 1000);
    $('#effect').remove();
};



var updateDatabase = () => {
    console.log('displayname is: ' + playerName);

    firebase.database().ref('/connections/playerOne').set({
        playerName: playerName,
        avatar: ''
    })
    // firebase.database().ref('playertwo').set({
    //     playerName: playerName,
    //     avatar: ''
    // });
};

var photoArray = ['https://vignette.wikia.nocookie.net/simpsons/images/5/57/Lisa_Simpson2.png/revision/latest?cb=20180319000458', 'https://vignette.wikia.nocookie.net/simpsons/images/8/89/Maggie.png/revision/latest?cb=20090115172358', 'https://vignette.wikia.nocookie.net/simpsons/images/6/65/Bart_Simpson.png/revision/latest?cb=20180319061933', 'https://vignette.wikia.nocookie.net/simpsons/images/4/4d/MargeSimpson.png/revision/latest?cb=20180314071936', 'https://vignette.wikia.nocookie.net/simpsons/images/0/02/Homer_Simpson_2006.png/revision/latest?cb=20091207194310'];

var renderAvatars = () => {
    for (i = 0; i < photoArray.length; i++) {
        div = $('<div>');
        images = $('<img>');
        var source = (photoArray[i]);
        images.attr({ 'src': source, 'height': '200px', 'width': 'auto' });
        div.append(images).attr('class', 'image');

        $('#avatarSelection').prepend(div);
    };
};

var updatePhoto = () => {
    avatarURL = avatar.attr('src');
    console.log(avatarURL);
    updatePic();
};

// firebase.database().ref().on('value', function(snap){
//     console.log(snap.val());

//     if(snap.child('playerone').exists()) {
//         console.log('playerone exists');
//         firebase.database().ref('playertwo').set({
//             playerName: displayName,
//             avatar: photoURL
//         });
//         playerTwo = $('<span>Hello, ' + displayName + '! You\'re Player Two!</span>');
//         $('#playerTwoDisplay').append(playerTwo);
//     }
//     else {
//         firebase.database().ref('playerone').set({
//             playerName: displayName,
//             avatar: photoURL
//         });
//         playerOne = $('<span>Hello, ' + displayName + '! You\'re Player One!</span>');
//         $('#playerOneDisplay').append(playerOne);
//     }
// });


$(document).ready(function () {
    renderAvatars();
    $('img').on('click', function () {
        console.log($(this));
        avatar = $(this)
        updatePhoto();
    }); //end of click event

    var input = document.getElementById("playerName");

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function (event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click

            playerName = $(this).val().trim();
            console.log(playerName);
            // updateDatabase();
            runEffect();
            $('#playerName').val('');
        }
    });







});

//I need to take the curent user data and just move it over to the database.

//I ended up getting rid of the auth part of the app.


// If there isn't anything at child index 0, then all of this is player one information.
//The next person to logs in, but if there is already a spot at index 0, then get pushed to index 1, and then their information is player two information.
// 