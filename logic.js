// Initialize Firebase
// Connect to API
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
var destination = "";
var startTime = "HH:mm";
var frequency = 0;

// Variables to be modified with Moment.js
var nextArrival = "";
var minAway = 0;

// When "submit" button is clicked, the input values are grabbed
$("#submit").on("click", function() {
    event.preventDefault();
    trainName = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    startTime = moment($("#first-train-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
    frequency = $("#frequency-input").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(startTime);
    console.log(frequency);

    // And pushed into the database
    database.ref().push({
        trainName:trainName,
        destination:destination,
        startTime:startTime,
        frequency:frequency
    });

   // PSEUDO: CODE NEEDED TO CLEAR THE FORM INPUT FIELDS WHEN THE SUBMIT BUTTON IS CLICKED.
   /*
   function clearFormInputField() {
        document.getElementsById("submit").reset();
    };
    */

    return false;
});


// PSEUDO: CODE NEEDED TO MODIFY THE VARIABLES nextArrival AND minAway.
var currentTime = moment();
console.log("CURRRENT TIME: " + moment(currentTime).format("HH:mm"));

// Convert Unix timestamp to HH:mmI have the unix time stamp
var startTimeConverted = moment.unix(startTime);
console.log("Start Time Converted: " + startTimeConverted);

/*
var startTimeConverted = moment(startTime.split(":"));
console.log("Start time converted " + startTimeConverted);

var minAway = moment().diff(moment(startTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + minAway);

var nextArrival = currentTime + minAway;
console.log(nextArrival);
*/

database.ref().on("child_added", function(snap) {
    console.log(snap.val());

    $(".tbody").append("<tr><td>" + snap.val().trainName + "</td>" +
    "<td>" + snap.val().destination + "</td>" +
    "<td>" + snap.val().frequency + " min</td>" +
    "<td>" + snap.val().nextArrival + "</td>" +
    "<td>" + snap.val().minAway + "</td></tr>"
    );
});