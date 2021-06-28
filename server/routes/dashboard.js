const router = require('express').Router();
const authorize = require('../middleware/authorize');

const { user } = require('../models');

router.get('/', authorize, async (req, res) => {
  try {
    await user.findAll({ where: { id: req.user.id } })
      .then((user1) => {
        res.json(user1);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
