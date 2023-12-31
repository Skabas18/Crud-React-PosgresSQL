const pool = require('../db');

const getAllTask = async (req, res, next) => {
   try {
    const allTask = await pool.query('SELECT * FROM task');
    res.json(allTask.rows)
   } catch (error) {
    next(error);
   }
    
}

const getTask = async(req, res, next) => {
    const {id} =req.params;
    try {
    const result = await pool.query("SELECT * FROM task WHERE id= $1", [id])
    if(result.rows.length ===0) return res.status(404).json({
        message: "Task not found"
    })
    res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const createTask = async (req, res, next) => {
    const { title, description } = req.body;
    try {
        const result = await pool.query("INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
        [title,description])
        res.json(result.rows[0])
    } catch (error) {
        next(error);
    }
}

const deleteTask = async  (req, res, next) => {
    const {id} =req.params;
    try {
    const result = await pool.query("DELETE FROM task WHERE id= $1", [id])
    if(result.rowCount ===0) return res.status(204).json({
        message: "Task not found"
    })
    res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
    
}
const updateTask = async (req, res, next) => {
    const {id} = req.params;
    try {
    const { title, description } = req.body;
    const result = await pool.query("UPDATE task SET title= $1, description = $2 WHERE id = $3 RETURNING *",[title, description, id]);
    if(result.rows.length ===0) return res.status(404).json({
        message: "Task not found"
    })
    res.json(result.rows[0]);

    } catch (error) {
          next(error);
    }
    
}
module.exports = {
    getAllTask,
    getTask,
    createTask,
    updateTask,
    deleteTask
}