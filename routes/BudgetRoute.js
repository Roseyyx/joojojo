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

router.get("/getBudget", async (req,res) => {
    try{
        const user = await User.findOne({username: req.session.flash.username}).then((obj) => {
            return obj.Wallet;
        });
        return res.status(200).json(user);
    } catch (e) {
        console.log(e);
        return res.status(400).json("Er is iets fout gegaan")
    }
})

router.get('/koopticket/:bedrag', async (req,res) => {
    try{
        const CheckWallet = await User.findOne({username: req.session.flash.username}).then((obj) => {
            if((obj.Wallet - req.params.bedrag) < 0 || obj.Wallet <= 0){
                req.flash("error_code", `U heeft niet genoeg geld!`);
                res.redirect("/dashboard");
            }
        });
        const user = await User.findOneAndUpdate({username: req.session.flash.username}, {$inc: {"Wallet": -req.params.bedrag}}, {upsert: true}).then((obj) => {
            req.flash("success_code", `Uw nieuwe saldo is: ${obj.Wallet}`);
        });
        return res.redirect("/dashboard");
    } catch (e) {
        return res.status(400).json("Er is iets fout gegaan")
    }
})

module.exports = router;