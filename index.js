const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const flash = require("connect-flash")

// Routers
const mainRouter = require("./routes/MainRoutes");
const userRouter = require("./routes/UserRoute");
const productRouter = require("./routes/ProductRoute");
const newsRouter = require("./routes/NewsRoute");
const Validater = require("./Helpers/Validator");

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
}));
app.use(flash());

app.use((req,res,next) => {
    req.session.errorcode = req.flash("error_code");
    req.session.successcode = req.flash("success_code");
    next();
})
// Define Routes
app.use("", mainRouter)
app.use("/auth", userRouter)
app.use("/product", productRouter)
app.use("/news", newsRouter)
app.use("/validate", Validater)

mongoose.connect(process.env.MONGO_SEC).then(() => {
    console.log("Database is aan het luistern pssh!");
}).catch((err) => {
    console.log(err);
    console.log("Database is niet aan het luisteren pssh!");
});


app.listen(3000, () => {
    console.log("Backend server is aan het lopen!");
})