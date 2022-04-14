const coureurs = ["Verstappe", "Leclerc", "Hamilton", "Russell"];
const uitslag = {
    bekend: false,
    winnaar: "",
};

let bedrag = 0;

// controleren of de gebruiker een gok heeft gedaan
if(localStorage.getItem("coureur")){
  userChoice = localStorage.getItem("coureur");
  bedrag = localStorage.getItem("bedrag");
  update()
}

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();
  // sla het antwoord op
  // haal het bedrag van het account
  bedrag = document.getElementById("bedrag").value;
  if (bedrag > 0) {
    update();
    if (uitslag.bekend) {
      alert(`Je hebt ${result() ? "gewonnen" : "verloren"}!`);
    } else {
      // sla het bedrag en coureur op in localstorage
      localStorage.setItem("coureur", document.getElementById("keuzes").value);
      localStorage.setItem("bedrag", bedrag);
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

// "random" uitslag
function result(){
    return win = randomWeighted([0.5, 0.2, 0.2, 0.2]);
}

// timer functie
// oldDate zorgt ervoor dat de browser niet iedere tick word geupdate
let oldDate = new Date();

// slaap lekker
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
async function update() {
  await sleep(250);

    const date = new Date();
    if (oldDate != date) {
      const minutes = date.getMinutes();
      // ieder half uur wordt de uitslag bekend gemaakt
      if (minutes == 30 || minutes == 0) {
          update();
          uitslag.bekend = true;
      } else {
          if(minutes < 30){
        document.getElementById("countdown").innerHTML =
          "De volgende uitslag word bekend over: " + (30 - minutes) + " minuten";
          document.getElementById("countdown").innerHTML +=  `<br>Je hebt ${bedrag} euro ingelegd op ${userChoice}`;
          } else {
                document.getElementById("countdown").innerHTML = "De volgende uitslag word bekend over: " + (60 - minutes) + " minuten";
                document.getElementById("countdown").innerHTML += `<br>Je hebt ${bedrag} euro ingelegd op ${userChoice}`;
              }
          oldDate = date;
          uitslag.bekend = false;
          update();
      }
    }
}


