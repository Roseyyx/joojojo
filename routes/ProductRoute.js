const Product = require("../modules/Product");

const router = require("express").Router();

router.post("/createProduct/:name/:prijs/:aantal", async (req,res) => {
    let NewProduct = await Product.findOne({productNaam: req.params.name});
    if (NewProduct){
        res.redirect("/dashboard");
        return;
    }
    const NieuwProduct = new Product({
        productNaam: req.params.name,
        productPrijs: req.params.prijs,
        productAantal: req.params.aantal
    });
    try {
        const savedProduct = await NieuwProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
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