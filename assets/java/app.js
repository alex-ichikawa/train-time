// create rule to check unicode? input of first train time to ensure correct format was entered


$("#submit").on("click", function() {
    if( $("#name").val() === '' || $("#destination").val() === '' || $("#time").val() === '' || $("#freq").val() === '') {
        alert("Please enter all info")
    } else {

    let newTrain = $("<tr>")
    let nameTag = $("<td>").html($("#name").val().trim()).attr("class", "lineInfo");
    newTrain.append(nameTag);

    let destinationTag = $("<td>").html($("#destination").val().trim()).attr("class", "lineInfo");
    newTrain.append(destinationTag);

    let frequencyTag = $("<td>").html($("#freq").val().trim() + " min").attr("class", "lineInfo");
    newTrain.append(frequencyTag);

    let nextTag = $("<td>").html('place holder');
    newTrain.append(nextTag);

    let minTag = $("<td>").html('place holder');
    newTrain.append(minTag);

    $(".trainInfo").append(newTrain);


    $("#name").val('');
    $("#destination").val('');
    $("#freq").val('');
    }
})