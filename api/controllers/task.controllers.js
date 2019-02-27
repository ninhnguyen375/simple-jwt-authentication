const Task = require('../models/task.model');

module.exports.list_all_task = (req, res) => {
  Task.find({}, (err, task) => {
    if (err) res.status(400).send(err);
    else {
      res.json(task);
    }
  });
};

// eslint-disable-next-line consistent-return
module.exports.create_a_task = (req, res) => {
  if (!req.body || !req.body.name) {
    res.status(400).send({ message: 'Not have enough data' });
  }
  Task.insertMany(req.body, (err, tasks) => {
    if (err) res.status(400).send(err);
    else {
      res.json(tasks);
    }
  });
};
