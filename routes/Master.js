const express = require("express");
const router = express.Router();
const modelUsers = require("../models/modelUsers");

router.get("/", (req, res) => {
    res.render("Master")
})

module.exports = router;
