const User = require("../modules/User");

const router = require("express").Router();

router.post("/signup", async (req,res,next) => {
    let NewUser = await User.findOne({email});
    if (NewUser)
        res.redirect("/signup");
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

module.exports = router;