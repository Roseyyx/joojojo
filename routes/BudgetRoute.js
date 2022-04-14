const User = require("../modules/User");
const router = require("express").Router();

router.post("/setBudget", async (req,res) => {
    try{
        const user = await User.findOneAndUpdate({username: req.session.flash.username}, {$inc: {"Wallet": req.body.credits}}, {upsert: true}).then((obj) => {
            req.flash("success_code", `Uw nieuwe saldo is: ${obj.Wallet}`);
        });
            return res.redirect("/dashboard");

    } catch (e) {
        console.log(e);
        return res.status(400).json("Er is iets fout gegaan")
    }
})

module.exports = router;