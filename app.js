const express = require("express");
const hbs = require("hbs");
const path = require("path");
const PORT = 3000;
require("dotenv").config();
const session = require ("express-session");

const routeLogin = require("./routes/Login");
const routeHome = require("./routes/Home");
const { Console } = require("console");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false})); 

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname,"./views/partials"));

app.use("/", routeLogin);
app.use("/Home", routeHome);

app.get("*", (req, res) =>{
    res.send("Página no encontrada")
});

app.listen(PORT, (err) =>{
    err? Console.log("Ocurrió un error") : console.log(`Servidor corre en http://localhost:${PORT}`)
});


