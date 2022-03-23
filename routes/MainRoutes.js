const Product = require("../modules/Product");

const router = require("express").Router();

router.get("/login", (req,res) => {
    if (req.session.isAuth){
        res.redirect("/dashboard")
    } else {
        res.render("login", {errorcode: req.session.errorcode, successcode: req.session.successcode});
    }
})

router.get("/dashboard",  (req, res) => {
    if (req.session.isAuth){
        res.render("dashboard", {errorcode: req.session.errorcode, successcode: req.session.successcode});
    }
    else
        res.redirect("/login");
});

router.get("", (req, res) => {
    res.render("index");
})

module.exports = router;