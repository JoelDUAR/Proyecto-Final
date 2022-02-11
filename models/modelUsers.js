const pool = require("../db");
const md5 = require("md5");
const async = require("hbs/lib/async");

const getUser = async (user, pass) => {
    const query = "select * from usuarios where usuario = ? and contrasenia = ?";
    const row = await pool.query(query, [user, pass]);
    return row[0]
} 

const getAllUsers = async (users) => {
    const query = "select * from usuarios";
    const row = await pool.query(query, [users]);
    return row;
}

const getOneUser = async (id_usuario) => {
    try {
        const query = "SELECT * from usuarios where id_usuario = ?"
        const row = await pool.query(query, [id_usuario]);
        return row;
    } catch (error) {
        console.log(error)
        
    }
};

const singUp = async (data) => {
    try {
        const query = "INSERT INTO usuarios set ?";
        const row = await pool.query(query, [data]);
        return row;
        
    } catch (error) {
        console.log(error)
    }
};

const deleteUser = async (id_usuario) => {
    const query = "delete from usuarios where id_usuario = ?"
    const row = await pool.query(query, [id_usuario])
    return row;
};

module.exports = {getUser, singUp, getAllUsers, getOneUser, deleteUser}; 