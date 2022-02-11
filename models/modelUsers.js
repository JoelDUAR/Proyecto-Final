const pool = require("../db");
const md5 = require("md5");

const getUser = async (user, pass) => {
    const query = "select * from usuarios where usuario = ? and contrasenia = ?";
    const row = await pool.query(query, [user, pass]);
    return row[0]
} 

const getAllUsers = async (arrUsers) => {
    const query = "select * from usuarios";
    const row = await pool.query(query, [arrUsers]);
    return row[0]
}

const singUp = async (data) => {
    try {
        const query = "INSERT INTO usuarios set ?";
        const row = await pool.query(query, [data]);
        return row;
        
    } catch (error) {
        console.log(error)
    }
}


module.exports = {getUser, singUp, getAllUsers}; 