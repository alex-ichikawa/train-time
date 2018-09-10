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

    console.log("time " + $("#time").val());
    console.log("date " + new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), $("#time").val().substring(0,2), $("#time").val().substring(3,5)));
    let n = $("#time").toDateString();
    n.setMinutes(n.getMinutes() +5)
    console.log("please work " + n);

    $(".trainInfo").append(newTrain);


    $("#name").val('');
    $("#destination").val('');
    $("#freq").val('');
    }
})

let now = new Date().getHours();
console.log("date " + Date());
console.log("date now " + Date.now());
console.log("new date " + new Date().toLocaleTimeString());
console.log("format " + now);

future = function() {
    var d = new Date();
    d.setMinutes(d.getMinutes() + 25);
    console.log("future " + d);


}
future();

