const News = require("../modules/News");

const router = require("express").Router();


router.post("/createNews", async (req,res) => {
    let NewNews = await News.findOne({newsTitel: req.body.name});
    if (NewNews){
        res.redirect("/dashboard");
        return;
    }
    const NieuwNews = new News({
        newsTitel: req.body.name,
        newsAfbeelding: req.body.path,
        newsInhoud: req.body.inhoud
    });
    try {
        const savedNews = await NieuwNews.save();
        res.status(201).json(savedNews);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get("/getNews", async (req,res) => {
    try {
        const NewsItems = await News.find();
        res.status(201).json(NewsItems);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get("/:id", async (req,res) => {
    try {
        res.redirect('/' + req.params.id);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;