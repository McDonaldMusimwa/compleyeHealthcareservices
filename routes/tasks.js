const router = require('express').Router();
const taskObject = require('../controller/tasks')


router.post('/task/:userId',taskObject.createTask);
router.get('/tasks/admin/:userId',taskObject.getAllAdminTasks);
router.get("/tasks/:adminId/:userId", taskObject.getUserTasks);
router.get('/user/:userId/task/:taskId',taskObject.getTask);
router.patch('/user/:userId/task/:taskId',taskObject.modifyTask);
router.delete('/user/:userId/task/:taskId',taskObject.deleteTask);



module.exports = router;