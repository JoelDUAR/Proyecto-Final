"use strick"

const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>{
    res.render("Home");
})

module.exports = router;