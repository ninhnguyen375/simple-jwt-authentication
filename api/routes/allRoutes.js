const express = require('express');

const router = express.Router();
const taskController = require('../controllers/task.controllers');
const userController = require('../controllers/user.controllers');

router.get('/tasks', taskController.list_all_task);
router.post('/tasks', userController.loginRequired, taskController.create_a_task);

router.post('/auth/signup', userController.Signup);
router.post('/auth/signin', userController.Signin);

module.exports = router;
