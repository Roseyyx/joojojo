const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const flash = require("connect-flash")

// Routers
const userRouter = require("./routes/UserRoute");
const productRouter = require("./routes/ProductRoute");
const newsRouter = require("./routes/NewsRoute");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static("public"));
app.use('/css', express.static(__dirname + "public/css"));
app.use('/js', express.static(__dirname + "public/js"));
app.use('/img', express.static(__dirname + "public/img"));

app.set("views", "./views");
app.set("view engine", "ejs");

// Session
const store = new MongoDBSession({
    uri: process.env.MONGO_SEC,
    collection: "mySessions"
})

app.use(session({
    secret: process.env.COOKIE_SEC,
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use(flash());

app.use((req,res,next) => {
    req.session.errorcode = req.flash("error_code");
    req.session.successcode = req.flash("success_code");
    next();
})

// Define Routes
app.use("/auth", userRouter)
app.use("/product", productRouter)
app.use("/news", newsRouter)

mongoose.connect(process.env.MONGO_SEC).then(() => {
    console.log("Database is aan het luistern pssh!");
}).catch((err) => {
    console.log(err);
});

app.get("/login", (req,res) => {
    if (req.session.isAuth){
        res.redirect("/dashboard")
    } else {
        res.render("login", {errorcode: req.session.errorcode, successcode: req.session.successcode});
    }
})

app.get("/dashboard",  (req, res) => {
    if (!req.session.isAuth){
        res.render("dashboard", {errorcode: req.session.errorcode, successcode: req.session.successcode});
    }
    else
        res.redirect("/login");
});

app.get("", (req, res) => {
    res.render("index");
})

app.listen(3000, () => {
    console.log("Backend server is aan het lopen!");
})