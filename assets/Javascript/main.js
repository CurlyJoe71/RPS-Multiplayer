var config = {
    apiKey: "AIzaSyCgy1k_47eHRfnN-7G95VCrf9cA3zAi6c8",
    authDomain: "rps-multiplayer-fd60d.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-fd60d.firebaseio.com",
    projectId: "rps-multiplayer-fd60d",
    storageBucket: "rps-multiplayer-fd60d.appspot.com",
    messagingSenderId: "269715592579"
};
firebase.initializeApp(config);

var displayName, photoURL, avatarURL, div, images, avatarURL, avatar, playerOne, playerTwo, playerName, connectionsNumber, playerOneKey, playerTwoKey, player;
var database = firebase.database();
var avatarDiv = $('#avatarSelection');

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
            player = 1;
            var con = connectionsRef.push({
                playerName: '',
                avatar: ''
            });
            playerOneKey = con.key;
            console.log('playerOneKey is: ' + playerOneKey)
        }
        else {
            player = 2
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
    $("#nameSelection").hide('bounce', 1000, callback);
};
// Callback function to bring a hidden box back
function callback() {
    setTimeout(function () {
        $("#nameSelection").removeAttr("style").hide().fadeIn();
    }, 1000);
    $('#nameSelection').remove();
};

//***USING JQUERY UI EFFECT***/
function runEffect2() {
    // Run the effect
    $("#avatarSelection").hide('puff', 1000, callback2);
};
// Callback function to bring a hidden box back
function callback2() {
    setTimeout(function () {
        $("#avatarSelection").removeAttr("style").hide().fadeIn();
    }, 1000);
    $('#avatarSelection').remove();
};


var updateDatabase = () => {
    console.log('displayname is: ' + playerName);
    if (player === 1) {
        firebase.database().ref('/connections/' + playerOneKey).set({
            playerName: playerName,
            avatar: '',
            move: ''
        })
    }
    else {
        firebase.database().ref('/connections/' + playerTwoKey).set({
            playerName: playerName,
            avatar: '',
            move: ''
        })
    }
};

var updateDatabasePhoto = () => {
    if (player === 1) {
        firebase.database().ref('/connections/' + playerOneKey).set({
            playerName: playerName,
            avatar: avatarURL,
            move: ''
        })
    }
    else {
        firebase.database().ref('/connections/' + playerTwoKey).set({
            playerName: playerName,
            avatar: avatarURL,
            move: ''
        })
    };
};

var testObject = {
    '0': {
        'name': 'Marge',
        'URL': 'https://vignette.wikia.nocookie.net/simpsons/images/4/4d/MargeSimpson.png/revision/latest?cb=20180314071936',
        'description': 'Marge is one tough Bouvier with hair that won\'t quit.'
    },
    '1': {
        'name': 'Homer',
        'URL': 'https://vignette.wikia.nocookie.net/simpsons/images/0/02/Homer_Simpson_2006.png/revision/latest?cb=20091207194310',
        'description': 'Homer is your man if you\'re craving donuts.'
    },
    '2': {
        'name': 'Bart',
        'URL': 'https://vignette.wikia.nocookie.net/simpsons/images/6/65/Bart_Simpson.png/revision/latest?cb=20180319061933',
        'description': 'Are you a rascal? You\'ll want to pick Bart.'
    },
    '3': {
        'name': 'Lisa',
        'URL': 'https://vignette.wikia.nocookie.net/simpsons/images/5/57/Lisa_Simpson2.png/revision/latest?cb=20180319000458',
        'description': 'This little genius will guide you to victory.'
    },
    '4': {
        'name': 'Maggie',
        'URL': 'https://vignette.wikia.nocookie.net/simpsons/images/8/89/Maggie.png/revision/latest?cb=20090115172358',
        'description': 'Don\'t let the pacifier fool you. Maggie is a tough baby.'
    }
}

var photoArray = ['https://vignette.wikia.nocookie.net/simpsons/images/5/57/Lisa_Simpson2.png/revision/latest?cb=20180319000458', 'https://vignette.wikia.nocookie.net/simpsons/images/8/89/Maggie.png/revision/latest?cb=20090115172358', 'https://vignette.wikia.nocookie.net/simpsons/images/6/65/Bart_Simpson.png/revision/latest?cb=20180319061933', 'https://vignette.wikia.nocookie.net/simpsons/images/4/4d/MargeSimpson.png/revision/latest?cb=20180314071936', 'https://vignette.wikia.nocookie.net/simpsons/images/0/02/Homer_Simpson_2006.png/revision/latest?cb=20091207194310'];

var renderAvatars = () => {
    for (i = 0; i < 5; i++) {
        images = $('<img>');
        var source = (testObject[i].URL);
        var name = (testObject[i].name);
        var description = (testObject[i].description);
        images.attr({ 'src': source, 'height': '200px', 'width': 'auto' });
        $('#avatarSelection').append('<div class="row"><div class="col s12 m6"><div class="card"><div class="card-image">' + '<img src=' + source + '><span class="yellow  light-blue-text card-content large">' + name + '</span><a class="btn-floating halfway-fab waves-effect waves-light red" data-value=' + name + '><i class="material-icons">+</i></a></div><br /><div class="card-content"><p>' + description + '</p></div></div></div></div>');
    };
    //adding a paragraph with description
    $('#avatarSelection').prepend('<div class="avatar-text"><p>Please select your avatar.<p><div>');

    $('.btn-floating').on('click', function () {
        console.log($(this));
        avatarURL = $(this).parent().find('img').attr('src');
        console.log(avatar);

        updateDatabasePhoto();
        //need to fun effect function
        runEffect2();

    }); //end of click event
}; //end of render Avatars

function hideAvatarDiv() {
    var avatarDiv = $('#avatarSelection');
    avatarDiv.toggle();
};

$(document).ready(function () {
    hideAvatarDiv();
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
            updateDatabase();
        }
    });
    $('#nameSelection').on('remove', function () {
        hideAvatarDiv();
        renderAvatars();
    })







});

        //I need to take the curent user data and just move it over to the database.

        //I ended up getting rid of the auth part of the app.


        // If there isn't anything at child index 0, then all of this is player one information.
        //The next person to logs in, but if there is already a spot at index 0, then get pushed to index 1, and then their information is player two information.
// 