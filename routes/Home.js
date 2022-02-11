"use strick"

const express = require("express");
const async = require("hbs/lib/async");
const router = express.Router();
const modelExpenses = require("../models/modelExpenses");
const modelIncome = require("../models/modelIncome")
const modelUsers = require("../models/modelUsers");
const cloudinary = require("cloudinary").v2;
const util = require("util");
const uploader= util.promisify(cloudinary.uploader.upload)
const destroy= util.promisify(cloudinary.uploader.destroy)
const {body, validationResult} = require("express-validator");

router.get("/", async (req, res) =>{
    const info = await modelIncome.getIncome();
    const report = await modelExpenses.getExpenses();
    res.render("Home", {info, report,});
});
router.get("/Login", async (req, res) =>{
    const users = await modelUsers.getAllUsers();
    const data = users.map((value) => {
        const imageURL = cloudinary.url(value.image, {
              width: 100,
              height: 100,
              crop: "thumb", 
            });
        return {...value, imageURL}
    });
    res.render("Login", {data});
});
 
router.get("/addIncome", (req, res) => {
res.render("addIncome")
});

router.get("/addExpenses", (req, res) => {
    res.render("addExpenses")
    });
 
    const validationAddIncome = [
        body("fecha", "Tenés que ingresar una fecha").exists().isDate(),
        body("descripcion", "Tenés que ingresar una descripción").exists().isLength({min:1}),
        body("id_concepto", "Tenés que ingresar un concepto").isInt({min:1, max:18}),
        body("monto", "Tenés que ingresar un monto").exists().isNumeric(),
 ]

router.post("/addIncome", validationAddIncome, async (req,res) => {
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            const dataForm = req.body;
            const arrErrors = errors.array();
            res.render("addIncome", {dataForm, arrErrors});
        }else{
    await modelIncome.addIncome({...req.body});
    res.redirect("/");}
    });


    const validationAddExpenses = [
        body("fecha", "Tenés que ingresar una fecha").exists().isDate(),
        body("descripcion", "Tenés que ingresar una descripción").exists().isLength({min:1}),
        body("id_concepto", "Tenés que ingresar un concepto").isInt({min:1, max:18}),
        body("monto", "Tenés que ingresar un monto").exists().isNumeric(),
 ]

router.post("/addExpenses", validationAddExpenses, async (req,res) => {
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            const dataForm = req.body;
            const arrErrors = errors.array();
            res.render("addExpenses", {dataForm, arrErrors});
        }else{
await modelExpenses.addExpenses({...req.body});
res.redirect("/")}
});

router.get("/singUp", (req, res) => {
    res.render("singUp")
    });

 const validationSingUp = [
        body("nombre", "Tenés que ingresar tu nombre").exists().isLength({min:2}),
        body("apellido", "Tenés que ingresar tu apellido").exists().isLength({min:2}),
        body("edad", "Tenés que ingresar tu edad").exists().isInt({min: 12, max: 120}),
        body("usuario", "Tenés que ingresar tu usuario").exists().isLength({min:2}),
        body("contrasenia", "Tenés que ingresar tu contraseña").exists().isLength({min:2}),
 ]
    router.post("/singUp", validationSingUp, async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const dataForm = req.body;
            const arrErrors = errors.array();
            res.render("singUp", {dataForm, arrErrors});
        }else{
    let imageFile = req.files.imagen;
const img_id = (await uploader(imageFile.tempFilePath)).public_id;
await modelUsers.singUp({...req.body, image: img_id})
    res.redirect("/");}
    });

router.get("/editUser/:id_usuario", async (req, res) => {
        const row = await modelUsers.getOneUser(req.params.id_usuario)
        const user = {
            id_usuario: row[0].id_usuario,
            nombre: row[0].nombre,
            apellido: row[0].apellido,
            edad: row[0].edad,
            usuario: row[0].usuario,
            contrasenia: row[0].contrasenia,
            Imagen: row[0].image,
        };
        res.render("editUser", {user});
    })

router.get("/deleteUser/:id_usuario", async (req, res) => {
  const row = await modelUsers.getOneUser(req.params.id_usuario);
  await destroy(row[0].image)
  await modelUsers.deleteUser(req.params.id_usuario);
  res.redirect("/Login");
})


router.get("/editIncome/:id_ingreso", async (req, res) => {
    const row = await modelIncome.getOneIncome(req.params.id_ingreso);
    const income = {
        id_ingreso: row[0].id_ingreso,
        fecha: row[0].fecha,
        descripcion: row[0].descripcion,
        id_concepto: row[0].id_concepto,
        monto: row[0].monto,
    };
    res.render("editIncome", {income});
})

router.get("/deleteIncome/:id_ingreso", async (req, res) => {
    const row = await modelIncome.deleteIncome(req.params.id_ingreso);
    await modelIncome.deleteIncome(req.params.id_ingreso);
    res.redirect("/");
  })

router.get("/editExpense/:id_egreso", async (req, res) => {
    const row = await modelExpenses.getOneExpense(req.params.id_egreso)
    const expense = {
        id_egreso: row[0].id_egreso,
        fecha: row[0].fecha,
        descripcion: row[0].descripcion,
        id_concepto: row[0].id_concepto,
        monto: row[0].monto,
    };
    res.render("editExpense", {expense});
})

router.get("/deleteExpense/:id_egreso", async (req, res) => {
    const row = await modelExpenses.deleteExpese(req.params.id_egreso);
    await modelExpenses.deleteExpese(req.params.id_egreso);
    res.redirect("/");
  })


module.exports = router;