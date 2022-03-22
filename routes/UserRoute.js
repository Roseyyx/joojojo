const User = require("../modules/User");
const router = require("express").Router();

router.post("/register", async (req,res) => {
    let NewUser = await User.findOne({email: req.body.email});
    if (NewUser)
        res.redirect("/register");
    NewUser = new User({
        username: req.body.username,
        email: req.body.email,
    });
    try {
        const SavedUser = await NewUser.save();
        res.status(201).json(SavedUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user){
            req.flash("error_code", "Verkeerd wachtwoord of gebruikersnaam");
            res.redirect("/login")
        }
        const { email, ...others} = user._doc;
        req.flash("success_code", `Ingelogd als: ${user.username}`);
        res.redirect("/dashboard")
    } catch (error) {

    }
})

module.exports = router;