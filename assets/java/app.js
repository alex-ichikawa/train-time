$("#submit").on("click", function() {
    // if a field is blank alerts to fill in all fields
    if( $("#name").val() === '' || $("#destination").val() === '' || $("#time").val() === '' || $("#freq").val() === '') {
        alert("Please enter all info")
    } else {
    //timeConv sets a date time with the current day and the start time value given
    let timeConv = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), $("#time").val().substring(0,2), $("#time").val().substring(3,5));
    let timeArray = [];
    let timeAdd = Number($("#freq").val());
    let nextTime = '';
    let diff = '';

    //loop adds the frequecy time to the start time until it is greater than the current time. Stores all values in an array
    for (timeConv; Date.parse(timeConv) < Date.parse(new Date()); timeConv.setMinutes(timeConv.getMinutes() + timeAdd)) {
        timeArray.push(timeConv);        
    }

    //Grabs the last value in the array and converts to 12hr clock
    if (timeArray[timeArray.length -1].getHours() >= 13) {
        nextTime = `${timeArray[timeArray.length - 1].getHours() - 12} : ${timeArray[timeArray.length - 1].getMinutes()}`;
    } else {
        nextTime = `${timeArray[timeArray.length - 1].getHours()} : ${timeArray[timeArray.length - 1].getMinutes()}`;
    }

    //calculates the difference in min between the current time and next train time
    function diff_min() {
        //converts to milliseconds since jan 1 1970, finds the diff then divids by 1000 to get seconds
        diff = (timeArray[timeArray.length -1].getTime() - new Date().getTime()) / 1000;
        //divides by 60 to get minutes
        diff /= 60
        diff = Math.abs(Math.round(diff));
    }

    diff_min();

    let newTrain = $("<tr>")
    let nameTag = $("<td>").html($("#name").val().trim()).attr("class", "lineInfo");
    newTrain.append(nameTag);

    let destinationTag = $("<td>").html($("#destination").val().trim()).attr("class", "lineInfo");
    newTrain.append(destinationTag);

    let frequencyTag = $("<td>").html($("#freq").val().trim() + " min").attr("class", "lineInfo");
    newTrain.append(frequencyTag);

    let nextTag = $("<td>").html(nextTime);
    newTrain.append(nextTag);

    let minTag = $("<td>").html(diff);
    newTrain.append(minTag);


    $(".trainInfo").append(newTrain);

    $("#name").val('');
    $("#destination").val('');
    $("#freq").val('');
    $("#time").val('');
    }
})

