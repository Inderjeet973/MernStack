const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware')
const{
      getTasks,
      addTask,
      updateTask,
      deleteTask,
} = require('../controllers/taskController')

router.get('/',getTasks);
router.post('/add',authMiddleware,addTask);
router.put('/update/:id',authMiddleware,updateTask);
router.delete('/delete/:id',deleteTask);

module.exports = router;