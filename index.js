const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();

// Routers
const userRouter = require("./routes/UserRoute");
const productRouter = require("./routes/ProductRoute");
const newsRouter = require("./routes/NewsRoute");

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("public"));
app.use('/css', express.static(__dirname + "public/css"));
app.use('/js', express.static(__dirname + "public/js"));
app.use('/img', express.static(__dirname + "public/img"));

app.set("views", "./views");
app.set("view engine", "ejs");

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
    res.render("login");
})

app.get("", (req, res) => {
    res.render("index");
})

app.listen(3000, () => {
    console.log("Backend server is aan het lopen!");
})