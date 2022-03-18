const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("public"));
app.use('/css', express.static(__dirname + "public/css"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("", (req, res) => {
    res.render("index");
})

app.listen(3000, () => {
    console.log("Backend server is aan het lopen!");
})