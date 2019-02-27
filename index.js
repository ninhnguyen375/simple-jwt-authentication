require('dotenv').config();
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = require('express')();
const allRoutes = require('./api/routes/allRoutes');

const { PORT, MONGO_URI, JWTKey } = process.env;

// Config MongoDB
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

// Config middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (
    req.headers
    && req.headers.authorization
    && req.headers.authorization.split(' ')[0] === 'JWT'
  ) {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], JWTKey, (err, decode) => {
      if (err) req.user = undefined;
      else {
        req.user = decode;
      }
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

// API
app.use('/', allRoutes);

// orther case
app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(PORT, () => {
  console.log(`Ready on http://localhost:${PORT}`);
});
