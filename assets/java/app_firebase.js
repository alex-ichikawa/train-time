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
let myTimer = setInterval(() => renderTrain(trainArray), 60000);

function renderTrain(trainArray) {
    $(".trainInfo").empty();
    console.log(new Date());
    for (let i = 0; i < trainArray.length; i++) {
        let newRow = $("<tr>")
        let nameTag = $("<td>").html(trainArray[i].name).attr("class", "lineInfo");
        newRow.append(nameTag);

        let destinationTag = $("<td>").html(trainArray[i].destination).attr("class", "lineInfo");
        newRow.append(destinationTag);

        let frequencyTag = $("<td>").html(trainArray[i].freq).attr("class", "lineInfo");
        newRow.append(frequencyTag);

        let timeConv = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), trainArray[i].time.substring(0, 2), trainArray[i].time.substring(3, 5));
        let timeAdd = Number(trainArray[i].freq);
        let timeArray = [];
        let nextTime = '';
        let diff = '';
        let nextHour = '';
        let nextMin = '';

        //loop adds the frequecy time to the start time until it is greater than the current time. Stores all values in an array
        if (Date.parse(timeConv) >= Date.parse(new Date())) {
            timeArray.push(timeConv);
        } else {
            for (timeConv; Date.parse(timeConv) < Date.parse(new Date()); timeConv.setMinutes(timeConv.getMinutes() + timeAdd)) {
                timeArray.push(timeConv);
            }
        }

        //Grabs the last value in the array and converts to 12hr clock
        if (timeArray[timeArray.length - 1].getHours() >= 13) {
            nextHour = timeArray[timeArray.length - 1].getHours() - 12;
        } else {
            nextHour = timeArray[timeArray.length - 1].getHours();
        }
        //Adds leading 0 if the minute value is below 10
        if (timeArray[timeArray.length - 1].getMinutes().toString().length === 1) {
            nextMin = `0${timeArray[timeArray.length - 1].getMinutes()}`;
        } else {
            nextMin = timeArray[timeArray.length - 1].getMinutes();
        }
        //combines the hour and min together
        nextTime = `${nextHour}:${nextMin}`;


        //calculates the difference in min between the current time and next train time
        function diff_min() {
            //converts to milliseconds since jan 1 1970, finds the diff then divids by 1000 to get seconds
            diff = (timeArray[timeArray.length - 1].getTime() - new Date().getTime()) / 1000;
            //divides by 60 to get minutes
            diff /= 60
            // diff = Math.abs(Math.round(diff));
            diff = Math.ceil(diff);
        }

        diff_min();

        let nextTag = $("<td>").html(nextTime);
        newRow.append(nextTag);

        let minTag = $("<td>").html(diff);
        newRow.append(minTag);

        let delTag = $("<button>").html("X");
        delTag.attr("type", "button");
        delTag.attr("data-index", i);
        delTag.attr("id", "delete");
        newRow.append(delTag);

        $(".trainInfo").append(newRow);

    }
}

$("#submit").on("click", function () {
    event.preventDefault();
    if ($("#name").val() === '' || $("#destination").val() === '' || $("#time").val() === '' || $("#freq").val() === '') {
        swal("Please Enter All Info")
    } else {
        let newTrain = {};
        newTrain.name = $("#name").val().trim()
        newTrain.time = $("#time").val().trim();
        newTrain.destination = $("#destination").val().trim()
        newTrain.freq = $("#freq").val();
        trainArray.push(newTrain);
        database.ref().set({
            train: JSON.stringify(trainArray),
        })
        $("#name").val('');
        $("#destination").val('');
        $("#freq").val('');
        $("#time").val('');
    }
});

$(document).on("click", '#delete', function () {
    let ind = this.dataset.index
    trainArray.splice(ind, 1);
    database.ref().set({
        train: JSON.stringify(trainArray),
    })
});

database.ref().on("value", function (snapshot) {
    trainArray = (JSON.parse(snapshot.val().train));
    renderTrain(trainArray);
});

if (!Array.isArray(trainArray)) {
    trainArray = [];
}

renderTrain(trainArray);
