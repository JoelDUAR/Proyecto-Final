"use strick"

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const {body, validationResult} = require("express-validator");

router.get("/", (req, res) =>{
    res.render("Contact");
});

const validationForm = [
    body("name", "Tenes que ingresar tu nombre").exists().isLength({min:2}),
    body("lastname", "Tenes que ingresar tu apellido").exists().isLength({min:2}),
    body("user", "Tenes que ingresar tu usuario").exists().isLength({min:2}),
    body("mail", "Tenes que ingresar tu email").exists().isEmail(),
    body("message", "Su mensaje debe contener entre 10 y 300 caracteres").exists().isLength({min: 10, max: 300}),

];

router.post("/", validationForm, async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const dataForm = req.body;
        const arrErrors = errors.array();
        res.render("Contact", {dataForm, arrErrors});

    }
    const emailMsg = {
        to: "atencionyireh@ConstantSourceNode.com",
        from: req.body.email,
        subject: "Mensaje enviado desde el formulario de contacto",
        html: `${req.body.name} ${req.body.lastname} envió el siguiente mensaje: ${req.body.message}.
        Contactar al mail: ${req.body.mail}`
    };


    
    const transport = nodemailer.createTransport({
        host: process.env.MT_HOST,
        port: process.env.MT_PORT,
        auth: {
          user: process.env.MT_USER,
          pass: process.env.MT_PASS
        }
      });
if(errors.isEmpty()){

let sendMessageStatus = await transport.sendMail(emailMsg);
let messageStatus = "";

if(sendMessageStatus.rejected.length){
messageStatus ="No se pudo enviar tu mensaje"
} else{
    messageStatus = "Mensaje enviado"
}
res.render("Contact", {
    messageStatus,
});
}
});
module.exports = router;