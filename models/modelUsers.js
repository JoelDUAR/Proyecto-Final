const pool = require("../db");
const md5 = require("md5");

const getUser = async (user, pass) => {
    const query = "select * from usuarios where usuario = ? and contrasenia = ?";
    const row = await pool.query(query, [user, md5(pass)]);
    return row[0]
} 

module.exports = {getUser};