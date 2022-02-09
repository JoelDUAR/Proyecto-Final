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
        html: `${req.body.name} ${req.body.lastname} envió el siguiente mensaje: ${req.body.message}`
    };

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "a9d956e345dd39",
          pass: "27c5c1b1f4c112"
        }
      });


transport.sendMail(emailMsg);
res.render("Contact", {
    message: "Mensaje Enviado"
});
});
module.exports = router;