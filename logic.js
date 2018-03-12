

// Initialize Firebase
// Connect to API and push () input to the database
var config = {
    apiKey: "AIzaSyBaFBYQUaaDEuA6O-WZTq8wYyPL12j7V9I",
    authDomain: "traintime-49b0a.firebaseapp.com",
    databaseURL: "https://traintime-49b0a.firebaseio.com",
    projectId: "traintime-49b0a",
    storageBucket: "traintime-49b0a.appspot.com",
    messagingSenderId: "909287852454"
};

firebase.initializeApp(config);
   
// Create global variables

var trainName = "";
var destination = "";
var startTime = "";
var frequency = 0;
var nextArrival = "";
var minAway = 0;

var database = firebase.database();

/*
database.ref().on("value", function(snap) {
    if(snap.child("highBidder").exists() && snap.child("highPrice").exists()) {
        highBidder = snap.val().highBidder;
        highPrice = snap.val().highPrice;
        $("highestBidder").html(highBidder);
        $("highestPrice").html("$"+highPrice);
    };
});
*/

// When "submit" button is clicked, the input values are grabbed
$("#submit").on("click", function() {
    event.preventDefault();
    trainName = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    startTime = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(startTime);
    console.log(frequency);

    database.ref().push({
        trainName:trainName,
        destination:destination,
        startTime:startTime,
        frequency:frequency
    });

    $('form-submit')[0].reset();

    return false;
});

database.ref().on("child_added", function(snap) {
    console.log(snap.val());

    $(".tbody").append("<tr><td>" + snap.val().trainName + "</td>" +
    "<td>" + snap.val().destination + "</td>" +
    "<td>" + snap.val().frequency + " min</td>" +
    "<td>" + snap.val().nextArrival + "</td>" +
    "<td>" + snap.val().minAway + " min</td></tr>"
    );
});