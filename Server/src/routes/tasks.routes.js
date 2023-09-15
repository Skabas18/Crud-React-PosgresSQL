const { Router } = require('express');
const { getAllTask,getTask,createTask,updateTask,deleteTask } = require('../controllers/tasks.controller')
const router = Router();

router.get('/task', getAllTask)

router.get('/task/:id', getTask)

router.post('/task', createTask)

router.delete('/task/:id', deleteTask)

router.put('/task/:id', updateTask)


module.exports = router;