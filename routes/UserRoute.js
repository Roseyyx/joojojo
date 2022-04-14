const User = require("../modules/User");
const router = require("express").Router();

router.post("/register", async (req,res) => {
    let NewUser = await User.findOne({email: req.body.email, username: req.body.username});
    if (NewUser){
        req.flash("error_code", "Deze gebruiker bestaat al");
        return res.redirect("/login");
    }
    if (!req.body.username || !req.body.email){
        req.flash("error_code", "Er is geen naam of email ingevoerd");
        return res.redirect("/login");
    }
    NewUser = new User({
        username: req.body.username,
        email: req.body.email,
    });
    try {
        const SavedUser = await NewUser.save();
        req.flash("success_code", `Account is gemaakt`);
        res.redirect("/login")
    } catch (error) {
        req.flash("error_code", "Er is iets misgegaan");
        res.redirect("/login");
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user){
            req.flash("error_code", "Verkeerd wachtwoord of gebruikersnaam");
            return res.redirect("/login")
        }
        if (!req.body.username){
            req.flash("error_code", "Er is geen naam ingevoerd");
            return res.redirect("/login");
        }
        const { email, ...others} = user._doc;
        req.flash("success_code", `Ingelogd als: ${user.username}`);
        req.flash("username", user.username);
        req.session.isAuth = true;
        res.redirect("/dashboard")
    } catch (error) {
        req.flash("error_code", "Er is iets misgegaan");
        res.redirect("/login");
    }
})


module.exports = router;