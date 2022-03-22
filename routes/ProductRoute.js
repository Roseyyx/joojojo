const Product = require("../modules/Product");
const flash = require("connect-flash")

const router = require("express").Router();

router.post("/createProduct", async (req,res) => {
    let NewProduct = await Product.findOne({productNaam: req.body.name});
    if (NewProduct){
        req.flash("error_code", `Er bestaat al een product met de naam: ${req.body.name}`);
        res.redirect("/dashboard");
        return;
    }
    const NieuwProduct = new Product({
        productNaam: req.body.name,
        productPrijs: req.body.prijs,
        productAantal: req.body.aantal
    });
    try {
        const savedProduct = await NieuwProduct.save();
        req.flash("success_code", `Product aangemaakt: ${NieuwProduct.productNaam}`);
        res.redirect("/dashboard")
        //res.status(201).json(savedProduct);
    } catch (error) {
        if (req.body.naam == undefined){
            req.flash("error_code", `Er is geen product naam ingevuld`);
        }
        else if (req.body.prijs == ""){
            req.flash("error_code", `Er is geen prijs ingevuld`);
        } else {
            req.flash("error_code", `Er is iets mis gegaan tijdens het maken van een product`);
        }
        res.redirect("/dashboard")
        //res.status(500).json(error);
    }
})

router.get("/getProduct/:name", async (req,res) => {
    try {
        const Producte = await Product.find({productNaam: req.params.name});
        res.status(201).json(Producte);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get("/getProducts", async (req,res) => {
    try {
        const Producte = await Product.find();
        res.status(201).json(Producte);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;