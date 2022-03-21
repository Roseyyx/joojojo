const User = require("../modules/User");

const router = require("express").Router();

router.post("/register", async (req,res) => {
    const {email} = req.body.email;
    let NewUser = await User.findOne({email});
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
        !user && res.status(401).json("Wrong username or password!");
        const { password, ...others} = user._doc;
        res.render("dashboard", {data : user.username});
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;