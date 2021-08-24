const express = require('express');
const cors = require('cors');

module.exports = async () => {
  const app = express();

  // middleware
  app.use(cors());
  app.use(express.json());

  // routes
  app.get('/tst', (req, res) => res.json({ status: 'ok' }));
  app.use('/authentication', require('./routes/jwtAuth'));
  app.use('/dashboard', require('./routes/dashboard'));

  app.use('/address', require('./routes/address'));
  app.use('/csc', require('./routes/csc'));
  return app;
};
