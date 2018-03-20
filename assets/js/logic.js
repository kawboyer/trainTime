// Connect to API
// Initialize Firebase
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
var database = firebase.database();

// Variables from user input
var trainName = "";

// Variables to be modified with Moment.js
var nextArrival = "";
var minAway = 0;

// When "submit" button is clicked, the input values are grabbed
$("#submit").on("click", function () {
    event.preventDefault();
    trainName = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var startTime = moment($("#first-train-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
    var frequency = parseInt($("#frequency-input").val());

    console.log(trainName);
    console.log(destination);
    console.log(startTime);
    console.log(frequency);

    // And pushed into the database
    database.ref().push({
        trainName: trainName,
        destination: destination,
        startTime: startTime,
        frequency: frequency
    });

    // Clear the form input fields when the submit button is clicked.
    $("#user-input").val("");

    return false;
});

database.ref().on("child_added", function (snap) {
    console.log(snap.val());

    // Current time in Unix timestamp (milliseconds)
    var currentTime = (moment().unix()) * 1000;
    console.log("CURRRENT TIME: " + currentTime);

    var currentTimeConverted = moment(currentTime).format("HH:mm");
    console.log("Current time converted: " + currentTimeConverted);

    // Start time i Unix timestamp (milliseconds) a year ago
    var startTime = ((snap.val().startTime) * 1000);
    console.log("START TIME (A YEAR AGO): " + startTime);

    var startTimeConverted = moment(startTime).format("HH:mm");
    console.log("Start time (a year ago) converted: " + startTimeConverted);

    // The amount of time (in minutes) until the next train arrives
    var minAway = (moment.unix(currentTime - snap.val().startTime).format("mm")) % snap.val().frequency;
    console.log("MINS AWAY: " + minAway);

    // The time that the next train arrives in Unix timestamp
    var nextArrivalTimestamp = moment().add(minAway, "minutes");

    // The next arrival time in military time
    var nextArrival = moment(nextArrivalTimestamp).format("HH:mm");
    console.log("NEXT ARRIVAL: " + nextArrival)

    $(".tbody").append("<tr><td>" + snap.val().trainName + "</td>" +
        "<td>" + snap.val().destination + "</td>" +
        "<td>" + snap.val().frequency + " min</td>" +
        "<td>" + nextArrival + "</td>" +
        "<td id=minAwayBlue>" + minAway + "</td></tr>"
    );
});