// Initialize Firebase
var config = {
    apiKey: "AIzaSyAR9jDpDPQjAVy-6U9fvGIsgCAXBxPrwFg",
    authDomain: "train-schedule-8f21f.firebaseapp.com",
    databaseURL: "https://train-schedule-8f21f.firebaseio.com",
    projectId: "train-schedule-8f21f",
    storageBucket: "train-schedule-8f21f.appspot.com",
    messagingSenderId: "657906514642"
};

firebase.initializeApp(config);

// Create a variable to reference the database
let database = firebase.database();
let trainArray = [];

function renderTrain(trainArray) {
    console.log(trainArray);
    //to do: for loop that loops through the objext to set to console. Will have to convert from UTC for te time conversion. 
    //maybe make new variable timeConv2 to store UTC converted time, run my previous if statement for time conversion using timeConv2
}

$("#submit").on("click", function () {
    event.preventDefault();
    if ($("#name").val() === '' || $("#destination").val() === '' || $("#time").val() === '' || $("#freq").val() === '') {
        alert("Please enter all info")
    } else {
        let newTrain = {};
        newTrain.name = $("#name").val().trim()
        newTrain.timeConv = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), $("#time").val().substring(0, 2), $("#time").val().substring(3, 5));
        newTrain.Destination = $("#destination").val().trim()
        newTrain.Freq = $("#freq").val();
        console.log(newTrain);
        //trainArray.push(newTrain);
        database.ref().set({
            train: JSON.stringify(newTrain), //was newTrain - haven't tested yet
        })
        renderTrain(trainArray);
        $("#name").val('');
        $("#destination").val('');
        $("#freq").val('');
        $("#time").val('');
    }
});






database.ref().on("value", function (snapshot) {
   trainArray.push(JSON.parse(snapshot.val().train));
});

if (!Array.isArray(trainArray)) {
    trainArray = [];
}

renderTrain(trainArray);