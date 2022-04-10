const coureurs = ["Verstappe", "Leclerc", "Hamilton", "Russell"];

document.getElementById("submit").addEventListener("click", function(event) {
    // prevent default
    event.preventDefault();
    let win = randomWeighted([0.5, 0.2, 0.2, 0.2]);
    alert(`Je hebt ${win ? "gewonnen" : "verloren"}!`);
});

// random weighted number generator
function randomWeighted(weights) {
    userChoice = document.getElementById("keuzes").value;
    var total = 0;
    for (var i = 0; i < weights.length; i++) {
        total += weights[i];
    }
    var randomNumber = Math.random() * total;
    for (var i = 0; i < weights.length; i++) {
        if (randomNumber <= weights[i]) {
            return coureurs[i] == userChoice;
        }
        randomNumber -= weights[i];
    }
}



