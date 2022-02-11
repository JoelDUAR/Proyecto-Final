const pool = require("../db");

const getIncome = async () => {
    try {
        const query = "SELECT * from ingresos order by id_ingreso DESC";
        const rows = await pool.query(query);
        return(rows);
    } catch (error) {
        console.log(error)
    }
    };

    const getOneIncome = async (id_ingreso) => {
        try {
            const query = "SELECT * from ingresos where id_ingreso = ? order by id_ingreso DESC"
            const row = await pool.query(query, [id_ingreso]);
            return row;
        } catch (error) {
            console.log(error)
            
        }
    }

const addIncome = async (operation) => {
    try {
        const query = "insert into ingresos set ?";
        const row = await pool.query(query, [operation]);
        return row;
        
    } catch (error) {
        console.log(error)
    }
}

const deleteIncome = async (id_ingreso) => {
    const query = "delete from ingresos where id_ingreso = ?"
    const row = await pool.query(query, (id_ingreso))
    return row;
};


module.exports = {getIncome,  addIncome, getOneIncome, deleteIncome}