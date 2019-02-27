const express = require('express');

const router = express.Router();
const taskController = require('../controllers/task.controllers');
const userController = require('../controllers/user.controllers');

router.get('/tasks', taskController.list_all_task);
router.post('/tasks', userController.loginRequired, taskController.create_a_task);

router.post('/auth/signup', userController.Signup);
router.post('/auth/signin', userController.Signin);

router.get('/', (req, res) => {
  res.send(
    `<p>Welcom to a demo jwt authentication api, you can try on Postman with route :<br>(Change config port or mongo_uri... in file .env)</p><br>POST: localhost:${
      process.env.PORT
    }/auth/signup<br>POST: localhost:${process.env.PORT}/auth/signin<br>GET: localhost:${
      process.env.PORT
    }/tasks<br>POST: localhost:${process.env.PORT}/tasks`,
  );
});
module.exports = router;
