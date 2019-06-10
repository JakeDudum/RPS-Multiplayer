
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

database.ref().on("value", function(snapshot) {
    Player1 = snapshot.child("player1").val();
    $("#player1Name").html(snapshot.child("player1").child("name").val());
    $("#player1Wins").html(snapshot.child("player1").child("wins").val());
    $("#player1Losses").html(snapshot.child("player1").child("losses").val());

    if (snapshot.child("player1").child("name").val() != "waiting") {
        $("#join1").addClass("d-none");
    }

    Player2 = snapshot.child("player2").val();
    $("#player2Name").html(snapshot.child("player2").child("name").val());
    $("#player2Wins").html(snapshot.child("player2").child("wins").val());
    $("#player2Losses").html(snapshot.child("player2").child("losses").val());

    if (snapshot.child("player2").child("name").val() != "waiting") {
        $("#join2").addClass("d-none");
    }
})

$("#player1").on('click', function () {
    event.preventDefault();

    name = $("#inputName1").val().trim();

    if (!Player1.exists) {
        database.ref("player1").update({
            name: name,
            exists: true,
        });
    }
    $("#join1").addClass("d-none");
    $("#join2").addClass("d-none");
});

$("#player2").on('click', function () {
    event.preventDefault();

    name = $("#inputName2").val().trim();
    
    if (!Player2.exists) {
        database.ref("player2").update({
            name: name,
            exists: true,
        });
    }
    $("#join1").addClass("d-none");
    $("#join2").addClass("d-none");
});

database.ref('/player1').set({
    name: "waiting",
    exists: false,
    wins: wins1,
    losses: losses1
});

database.ref('/player2').set({
    name: "waiting",
    exists: false,
    wins: wins2,
    losses: losses2
});


$("#submit").on('click', function () {
    event.preventDefault();

})
