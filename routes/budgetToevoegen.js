let credits = 0;

// function budgetToevoegen() {
//     let tOFv = prompt("Wilt U budget toevoegen of verwijderen?");
//     tOFv = tOFv.toLowerCase();

//     if (tOFv == "toevoegen") {
//         let toevoegen = prompt("Voer het toe te voegen bedrag in")
//         //voeg het bedrag toe aan de database

//     } else if (tOFv == "verwijderen" && credits > 0) {
//         let verwijderen = prompt("Voer het te verwijderen bedrag in")

//         if (credits-verwijderen < 0) {
//             alert("Als u dit bedrag verwijderd staat u rood!")

//         }  else {
//             alert("Het bedrag wordt verwijderd")
//             //verwijder bedrag uit database
//         }

//     } else {
//         alert("Ongeldige invoer")
//     }
// }

const User = require("../modules/User");
const router = require("express").Router();

let wallet = undefined;

router.get("/getbudget", async (req, res) => {
    let Budget = await User.findOne({_id: -1});
    if (Budget){
        wallet = Budget.geld;
    }
    res.status(200);
    return;
})

router.post("/setbudget", async (req,res) =>{
    let user = await User.findOne({username: "Modaal Gebruiker"});
    try {
        if (user){
            if (req.body.credits)
                user.Budget = req.body.credits;
            else
                res.status(402).json("Geen bedrag toegegeven");

        }
    } catch (error) {
        res.status(401).json(error);
    }
})

module.exports = router;