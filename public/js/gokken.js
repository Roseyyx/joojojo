const coureurs = ["Verstappe", "Leclerc", "Hamilton", "Russell"];
const uitslag = {
    bekend: false,
    winnaar: "",
};

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();
  // sla het antwoord op
  // haal het bedrag van het account
  let bedrag = document.getElementById("bedrag").value;
  if (bedrag > 0) {
    update();
    if (uitslag.bekend) {
      alert(`Je hebt ${result() ? "gewonnen" : "verloren"}!`);
    } else {
      update();
    }
  } else {
    alert("Je hebt geen geld!");
  }
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

function result(){
    return win = randomWeighted([0.5, 0.2, 0.2, 0.2]);
}

// timer functie

let oldDate = new Date();

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
async function update() {
  await sleep(250);

    const date = new Date();
    if (oldDate != date) {
      const minutes = date.getMinutes();
      if (minutes == 30 || minutes == 0) {
          update();
          uitslag.bekend = true;
      } else {
          if(minutes < 30){
        document.getElementById("countdown").innerHTML =
          "De volgende uitslag word bekend over: " + (30 - minutes) + " minuten";
          } else {
                document.getElementById("countdown").innerHTML = "De volgende uitslag word bekend over: " + (60 - minutes) + " minuten";
            }
          oldDate = date;
          uitslag.bekend = false;
          update();
      }
    }
}


