const express = require("express");
const hbs = require("hbs");
const path = require("path");
require("dotenv").config();
const PORT = 3000;
const fileupload = require("express-fileupload")

const routeLogin = require("./routes/Login");
const routeHome = require("./routes/Home");
const routeMaster = require("./routes/Master");
const routeContact = require("./routes/Contact");
const session = require ("express-session");
const app = express();

app.use(session({
    secret: "Proyecto Seguro",
    resave: false,
    saveUninitialized: true,
}))


const userSecured = async (req,res,next) =>{
    if(req.session.user){
        next();
    }else{
        const message = "Usted debe loguearse"
res.render("Login", {message})
    }
};

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false})); 
app.use(fileupload ({
    useTempFiles: true,
    tempFileDir: "/tmp/"

}))

const localAuth = (req, res, next) => {
    app.locals.userLogged = req.session.user
    next();}
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname,"./views/partials"));


app.use("/", localAuth, routeHome);
app.use("/Login", routeLogin);
app.use("/Master", userSecured, routeMaster);
app.use("/Contact", routeContact);

app.get("*", (req, res) =>{
    res.render("wrongRoute");
});



app.listen(PORT, (err) =>{
    err? Console.log("Ocurrió un error") : console.log(`Servidor corre en http://localhost:${PORT}`)
});


