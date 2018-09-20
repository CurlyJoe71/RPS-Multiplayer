var config = {
    apiKey: "AIzaSyCgy1k_47eHRfnN-7G95VCrf9cA3zAi6c8",
    authDomain: "rps-multiplayer-fd60d.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-fd60d.firebaseio.com",
    projectId: "rps-multiplayer-fd60d",
    storageBucket: "rps-multiplayer-fd60d.appspot.com",
    messagingSenderId: "269715592579"
};
firebase.initializeApp(config);

var displayName, photoURL, avatarURL, div, images, avatarURL, avatar, playerOne, playerTwo, playerName, connectionsNumber, thisPlayerKey, player, source, name, description;
var database = firebase.database();
var avatarDiv = $('#avatarSelection');

//***CONNECTION CODE***//
var connectionsRef = database.ref('connections');
var connectedRef = database.ref('.info/connected');
var playerOneRef = database.ref('/connections/playerOne');
var playerTwoRef = database.ref('/connections/playerTwo');

connectedRef.on('value', function (snap) {
    connectionsRef.once('value').then(function (snap) {
        connectionsNumber = snap.numChildren();
        console.log('number is: ' + connectionsNumber);
    });
        if (snap.val()) {
            var con = connectionsRef.push({
                playerName: '',
                avatar: '',
                move: ''
            });
            thisPlayerKey = con.key;
            console.log('thisPlayerKey is: ' + thisPlayerKey)
            con.onDisconnect().remove();
        };
});
//***END OF CONNECTION CODE***/


//I couldn't figure out how to get the 'otherPlayerKey' when another player connects.
//I didn't know how to limit the game to just two users.


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

//***USING JQUERY UI EFFECT2***/
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
        firebase.database().ref('/connections/' + thisPlayerKey).set({
            playerName: playerName,
            avatar: '',
            move: ''
        })
};

var updateDatabasePhoto = () => {
        firebase.database().ref('/connections/' + thisPlayerKey).set({
            playerName: playerName,
            avatar: avatarURL,
            move: ''
        })
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

var renderAvatars = () => {
    //render possible avatars for selection, adding HTML for card for each
    for (i = 0; i < 5; i++) {
        images = $('<img>');
        source = (testObject[i].URL);
        name = (testObject[i].name);
        description = (testObject[i].description);
        images.attr({ 'src': source, 'height': '200px', 'width': 'auto' });
        $('#avatarSelection').append('<div class="row"><div class="col s20 m6"><div class="card"><div class="card-image">' + '<img src=' + source + '><span class="yellow  light-blue-text card-content large">' + name + '</span><a class="btn-floating halfway-fab waves-effect waves-light red" data-value=' + name + '><i class="material-icons">add</i></a></div><br /><div class="card-content"><p>' + description + '</p></div></div></div></div>');
    };
    //adding a paragraph with description
    $('#avatarSelection').prepend('<div class="avatar-text"><p>Please select your avatar.<p><div>');

    $('.btn-floating').on('click', function () {
        console.log($(this));
        avatarURL = $(this).parent().find('img').attr('src');

        updateDatabasePhoto();
        //need to run effect function, then remove
        runEffect2();

        if (player === 1) {
            displayPlayerOne();
        }
        else {
            displayPlayerTwo();
        }
    }); //end of click event
}; //end of render Avatars

//function to run whenver the database is updated by the other player.


function displayPlayerOne() {
    $('#playerOneDisplay').toggle();
    $('#playerOneAvatar').attr('src', avatarURL);
    $('#playerOneName').text(playerName);
    $('#playerDisplayName').text(name);
};
function displayPlayerTwo() {
    $('#playerTwoDisplay').toggle();
    $('#playerTwoAvatar').attr('src', avatarURL);
    $('#playerTwoName').text(playerName);
    $('#playerDisplayName').text(name);
};

function hideAvatarDiv() {
    var avatarDiv = $('#avatarSelection');
    avatarDiv.toggle();
};

$(document).ready(function () {
    $('#playerOneDisplay').toggle();
    $('#playerTwoDisplay').toggle();

    hideAvatarDiv();
    var input = document.getElementById("playerName");

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function (event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
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