const express = require('express');
const router = express.Router();
const{
      getTasks,
      addTask,
      updateTask,
      deleteTask,
} = require('../controllers/taskController')

router.get('/',getTasks);
router.post('/add',addTask);
router.put('/update/:id',updateTask);
router.delete('/delete/:id',deleteTask);

module.exports = router;