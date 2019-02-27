const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports.Signup = (req, res) => {
  if (!req.body || !req.body.user_name || !req.body.user_email || !req.body.user_password) {
    res.status(400).send({ message: 'Not have enough data' });
  }
  const NewUser = req.body;
  NewUser.hash_password = bcrypt.hashSync(req.body.user_password, 10);
  User.insertMany(NewUser, (err, users) => {
    if (err) res.status(400).send(err);
    res.json(users);
  });
};

module.exports.Signin = async (req, res) => {
  if (!req.body || !req.body.user_email || !req.body.user_password) {
    res.status(400).send({ message: 'Not have enough data' });
  }

  User.findOne({ user_email: req.body.user_email }, (err, user) => {
    if (err) res.status(400).send({ message: err });

    if (!user || !bcrypt.compareSync(req.body.user_password, user.hash_password)) {
      res.status(401).send({ message: 'Invalid user or password' });
    }
    res.json({
      token: jwt.sign(
        {
          user_email: user.user_email,
          user_name: user.user_name,
          _id: user.id,
        },
        process.env.JWTKey,
      ),
    });
  });
};

module.exports.loginRequired = (req, res, next) => {
  if (req.user) next();
  else {
    res.status(401).json({ message: 'Unauthorized User' });
  }
};
