const async = require("hbs/lib/async");
const pool = require("../db")

const getExpenses = async () => {
    try {
        const query = "SELECT * from egresos order by id_egreso DESC";
        const rows = await pool.query(query);
        return(rows);
    } catch (error) {
        console.log(error)
    }
    };

    const getOneExpense = async (id_egreso) => {
        try {
            const query = "SELECT * from egresos where id_egreso = ? order by id_egreso DESC"
            const row = await pool.query(query, [id_egreso]);
            return row;
        } catch (error) {
            console.log(error)
            
        }
    }

const addExpenses = async (data) => {
    try {
        const query = "insert into egresos set ?";
        const row = await pool.query(query, [data]);
        return row;
        
    } catch (error) {
        console.log(error)
    }
}

const deleteExpese = async (id_egreso) => {
    const query = "delete from egresos where id_egreso = ?"
    const row = await pool.query(query, (id_egreso))
    return row;
};


module.exports = {getExpenses, addExpenses, getOneExpense, deleteExpese};
