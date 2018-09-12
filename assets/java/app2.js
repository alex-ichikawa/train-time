console.log(moment("13:10", "HH:mm").add(3, "hours").add(5, "minutes").format("HH:mm"));
console.log(moment().format("HH:mm"));
console.log(moment().getHours());