
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBMaADkXGTjthhbPHVctBZQ22FQQgInOwc",
    authDomain: "testing-69392.firebaseapp.com",
    databaseURL: "https://testing-69392.firebaseio.com",
    projectId: "testing-69392",
    storageBucket: "testing-69392.appspot.com",
    messagingSenderId: "761454096201",
    appId: "1:761454096201:web:9f34eec8748af7b3"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var name = "";
var pick = "";
var result;
var Player1;
var Player2;
var wins1 = 0;
var wins2 = 0;
var losses1 = 0;
var losses2 = 0;
var message = "";

function whoWins() {
    if (result === -2 || result === 1) {
        wins1++;
        losses2++;
    }
    else if (result === -1 || result === 2) {
        wins2++;
        losses1++;
    }
    else {
        //tie;
    }
}

database.ref('/player1').set({
    exists: false,
    name: "waiting for player 1",
    wins: wins1,
    losses: losses1
});

database.ref('/player2').set({
    exists: false,
    name: "waiting for player 2",
    wins: wins2,
    losses: losses2
});


$("#submit").on('click', function () {
    event.preventDefault();

})
