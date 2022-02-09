"use strick"

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.get("/", (req, res) =>{
    res.render("Contact");
});


router.post("/", (req,res) =>{
    console.log(req.body)
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


transport.sendMail(emailMsg);
res.render("Contact", {
    message: "Mensaje Enviado"
});
});
module.exports = router;