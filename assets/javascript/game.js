
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

var Player1;
var Player2;
var key1 = false;
var key2 = false;
var name = "";
var pick;
var result;
var wins1 = 0;
var wins2 = 0;
var losses1 = 0;
var losses2 = 0;
var message = "";
var messages = [];
var turn;

function whoWins() {
    result = Player1.pick - Player2.pick;
    if (result === -2 || result === 1) {
        wins1++;
        losses2++;

        database.ref("chat").push({
            message: "System: Player 1 WINS!!!"
        })
    }
    else if (result === -1 || result === 2) {
        wins2++;
        losses1++;

        database.ref("chat").push({
            message: "System: Player 2 WINS!!!"
        })
    }
    else {
        database.ref("chat").push({
            message: "System: It's a TIE!!!"
        })
    }

    database.ref("player1").update({
        wins: wins1,
        losses: losses1,
        turn: true
    });

    database.ref("player2").update({
        wins: wins2,
        losses: losses2,
        turn: false
    });
    $("#messages").stop().animate({ scrollTop: $("#messages")[0].scrollHeight }, 1000);
}

database.ref().on("value", function (snapshot) {
    Player1 = snapshot.child("player1").val();
    $("#player1Name").html(snapshot.child("player1").child("name").val());
    $("#player1Wins").html(snapshot.child("player1").child("wins").val());
    $("#player1Losses").html(snapshot.child("player1").child("losses").val());

    Player2 = snapshot.child("player2").val();
    $("#player2Name").html(snapshot.child("player2").child("name").val());
    $("#player2Wins").html(snapshot.child("player2").child("wins").val());
    $("#player2Losses").html(snapshot.child("player2").child("losses").val());

    if (key1 === true && snapshot.child("player1").child("turn").val() === true) {
        $("#choice1").removeClass("d-none");
    }

    if (key2 === true && snapshot.child("player2").child("turn").val() === true) {
        $("#choice2").removeClass("d-none");
    }

    if (Player1 != null) {
        $("#join1").addClass("d-none");
    }
    if (Player2 != null) {
        $("#join2").addClass("d-none");
    }

    var messageDiv = $("<div>");
    for (var key in snapshot.val().chat) {
        var row = $("<p>").text(snapshot.val().chat[key].message);
        row.addClass("mb-0");
        messageDiv.append(row);
    }
    $("#messages").html(messageDiv);
    $("#messages").stop().animate({ scrollTop: $("#messages")[0].scrollHeight }, 1000);
});

$(document).ready(function () {

    $("#submit").on('click', function () {
        event.preventDefault();
        if (key1 === true) {
            message = $("#message").val().trim();

            if (message.length > 0) {
                database.ref("chat").push({
                    message: Player1.name + ": " + message
                })
            }
        }
        if (key2 === true) {
            message = $("#message").val().trim();

            if (message.length > 0) {
                database.ref("chat").push({
                    message: Player2.name + ": " + message
                })
            }
        }
        $("#message").val("");
        $("#messages").stop().animate({ scrollTop: $("#messages")[0].scrollHeight }, 1000);
    });


    $("#player1").on('click', function () {
        event.preventDefault();

        name = $("#inputName1").val().trim();

        if (!key1 && name.length > 0) {
            database.ref('/player1').update({
                name: name,
                exists: true,
                wins: wins1,
                losses: losses1,
                turn: true
            });
            key1 = true;

            $("#join1").addClass("d-none");
            $("#join2").addClass("d-none");

            $("#choice1").removeClass("d-none");
        }
        else {
            database.ref("chat").push({
                message: "Please enter a non-empty name."
            })
        }
    });

    $("#player2").on('click', function () {
        event.preventDefault();

        name = $("#inputName2").val().trim();

        if (!key2 && name.length > 0) {
            database.ref('/player2').update({
                name: name,
                exists: true,
                wins: wins2,
                losses: losses2,
                turn: false
            });
            key2 = true;

            $("#join1").addClass("d-none");
            $("#join2").addClass("d-none");
        }
        else {
            database.ref("chat").push({
                message: "Please enter a non-empty name."
            })
        }

    });

    $("#rock1").on("click", function () {
        event.preventDefault();

        database.ref("player1").update({
            pick: 1,
            turn: false
        });
        $("#choice1").addClass("d-none");

        database.ref("player2").update({
            turn: true
        });
    })

    $("#paper1").on("click", function () {
        event.preventDefault();

        database.ref("player1").update({
            pick: 2,
            turn: false
        });
        $("#choice1").addClass("d-none");

        database.ref("player2").update({
            turn: true,
        });
    })

    $("#scissors1").on("click", function () {
        event.preventDefault();

        database.ref("player1").update({
            pick: 3,
            turn: false
        });
        $("#choice1").addClass("d-none");

        database.ref("player2").update({
            turn: true
        });
    })

    $("#rock2").on("click", function () {
        event.preventDefault();

        database.ref("player2").update({
            pick: 1,
            turn: false
        });
        $("#choice2").addClass("d-none");
        whoWins();
    })

    $("#paper2").on("click", function () {
        event.preventDefault();

        database.ref("player2").update({
            pick: 2,
            turn: false
        });
        $("#choice2").addClass("d-none");
        whoWins();
    })

    $("#scissors2").on("click", function () {
        event.preventDefault();

        database.ref("player2").update({
            pick: 3,
            turn: false
        });
        $("#choice2").addClass("d-none");
        whoWins();
    })

});
