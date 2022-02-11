const async = require("hbs/lib/async");
const pool = require("../db")

const getExpenses = async () => {
    try {
        const query = "SELECT * from egresos order by id_egreso DESC LIMIT 3";
        const rows = await pool.query(query);
        return(rows);
    } catch (error) {
        console.log(error)
    }
    };

    const getExpense = async (id) => {
        try {
            const query = "select * from egresos where id= ?"
            const row = await pool.query(query, [id]);
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

module.exports = {getExpenses, addExpenses, getExpense};
