
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

function whoWins() {
    result = Player1.pick - Player2.pick;
    if (result === -2 || result === 1) {
        wins1++;
        losses2++;

        database.ref("player1").update({
            wins: wins1
        });

        database.ref("player2").update({
            losses: losses2
        });

        database.ref("chat").push({
            message: "Player 1 WINS!!!"
        })
    }
    else if (result === -1 || result === 2) {
        wins2++;
        losses1++;

        database.ref("player2").update({
            wins: wins2
        });

        database.ref("player1").update({
            losses: losses1
        });

        database.ref("chat").push({
            message: "Player 2 WINS!!!"
        })
    }
    else {
        database.ref("chat").push({
            message: "It's a Tie!!!"
        })
    }
    if (key1 === true) {
        $("#choice1").removeClass("d-none");
    } else {
        $("#choice2").removeClass("d-none");
    }
    $("#messages").stop().animate({ scrollTop: $("#messages")[0].scrollHeight}, 1000);
}

database.ref().on("value", function (snapshot) {
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

    var messageDiv = $("<div>");
    for (var key in snapshot.val().chat) {
        console.log(snapshot.val().chat[key].message);
        var row = $("<p>").text(snapshot.val().chat[key].message);
        row.addClass("mb-0");
        messageDiv.append(row);
    }
    $("#messages").html(messageDiv);
});

$("#submit").on('click', function () {
    event.preventDefault();
    message = $("#message").val().trim();

    database.ref("chat").push({
        message: message
    })
    $("#message").val("");
    $("#messages").stop().animate({ scrollTop: $("#messages")[0].scrollHeight}, 1000);
});


$("#player1").on('click', function () {
    event.preventDefault();

    name = $("#inputName1").val().trim();

    if (!Player1.exists) {
        database.ref("player1").update({
            name: name,
            exists: true,
        });
        key1 = true;
    }
    $("#join1").addClass("d-none");
    $("#join2").addClass("d-none");

    $("#choice1").removeClass("d-none");
});

$("#player2").on('click', function () {
    event.preventDefault();

    name = $("#inputName2").val().trim();

    if (!Player2.exists) {
        database.ref("player2").update({
            name: name,
            exists: true,
        });
        key2 = true;
    }
    $("#join1").addClass("d-none");
    $("#join2").addClass("d-none");

    $("#choice2").removeClass("d-none");
});

$("#rock1").on("click", function () {
    event.preventDefault();

    database.ref("player1").update({
        pick: 1
    });
    $("#choice1").addClass("d-none");
})

$("#paper1").on("click", function () {
    event.preventDefault();

    database.ref("player1").update({
        pick: 2
    });
    $("#choice1").addClass("d-none");
})

$("#scissors1").on("click", function () {
    event.preventDefault();

    database.ref("player1").update({
        pick: 3
    });
    $("#choice1").addClass("d-none");
})

$("#rock2").on("click", function () {
    event.preventDefault();

    database.ref("player2").update({
        pick: 1
    });
    $("#choice2").addClass("d-none");
    whoWins();
})

$("#paper2").on("click", function () {
    event.preventDefault();

    database.ref("player2").update({
        pick: 2
    });
    $("#choice2").addClass("d-none");
    whoWins();
})

$("#scissors2").on("click", function () {
    event.preventDefault();

    database.ref("player2").update({
        pick: 3
    });
    $("#choice2").addClass("d-none");
    whoWins();
})

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
