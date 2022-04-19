
const News = require('../modules/News');
const Product = require('../modules/Product');

const router = require('express').Router();

router.get('/Beroeps', (req, res) => {
    res.render('index');
})

router.get('/tickets', (req, res) => {
    res.render('ticket');
})

router.get('/login', (req, res) => {
    if (req.session.isAuth) {
        res.redirect('/dashboard');
    } else {
        res.render('login', {errorcode: req.session.errorcode, successcode: req.session.successcode});
    }
})

router.get('/dashboard',  (req, res) => {
    if (req.session.isAuth){
        res.render('dashboard', {errorcode: req.session.errorcode, successcode: req.session.successcode});
    }
    else
        res.redirect('/login');
});

router.get('/news', async (req, res) => {
    try {
        let items = await News.find({}).sort({_id:-1});
        res.render('news', {errorcode: req.session.errorcode, successcode: req.session.successcode, newsitems: items});
    } catch (error) {
    }
})


router.get('/gokken', (req, res) => {
    if (req.session.isAuth){
        res.render('gokken', {errorcode: req.session.errorcode, successcode: req.session.successcode});
    }
    else
        res.redirect('/login');
})

router.get('/:id', async (req, res) => {
    try {
        let NieuwsItem = await News.findOne({_id: req.params.id});
        res.render('artikels', {errorcode: req.session.errorcode, successcode: req.session.successcode, data: NieuwsItem});
    } catch (error) {
        
    }
})



module.exports = router;