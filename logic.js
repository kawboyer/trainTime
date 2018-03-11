

// Initialize Firebase
// Connect to API and push () input to the database
var config = {
    apiKey: "AIzaSyBaFBYQUaaDEuA6O-WZTq8wYyPL12j7V9I",
    authDomain: "traintime-49b0a.firebaseapp.com",
    databaseURL: "https://traintime-49b0a.firebaseio.com",
    projectId: "traintime-49b0a",
    storageBucket: "",
    messagingSenderId: "909287852454"
    };

    firebase.initializeApp(config);
   
// Create global variables

var trainName = "";
var destination = "";
var startTime = "";
var frequency = 0;

var dataRef = firebase.database()

// When "submit" button is clicked, the input values are grabbed
$("#submit").on("click", function() {
    event.preventDefault();
    var trainName = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var startTime = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(startTime);
    console.log(frequency);

    return false;

    /*
    //And pushed into the database
    dataRef.ref().push({
        one: trainName,
        two: destination,
        three: startTime,
        four: frequency
    });
    console.log(trainName);
    */
});
/*
dataRef.ref().on("child_added", function(snap) {
    console.log(snap.val());
    // console.log(destination);

    $(".tbody").append("<tr><td>" + snap.val().trainName + "</td>" +
    "<td>" + snap.val().destination + "</td>" +
    "<td>" + snap.val().startTime + "</td>" +
    "<td>" + snap.startTime + "</td>" +
    "<td>" + frequency + "</td></tr>")
});
*/











