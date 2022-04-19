const router = require("express").Router();

// Email Validator
router.get("/checkEmail", (res,req,next) => {
    
})

// Email Verification
router.get("/sendEmail", (res,req) => {
    console.log(req.body);
    try {
        res.send(`Email verstuurd naar: ${req.body.email}`)
    } catch (error) {
        res.send(`Kan geen email versturen naar: ${req.body.email}.`)
    }
})

module.exports = router;