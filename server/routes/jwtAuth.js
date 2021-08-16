const express = require('express');
const bcrypt = require('bcrypt');

const { user } = require('../models');

const router = express.Router();
const validInfo = require('../middleware/validInfo');
const jwtGenerator = require('../utils/jwtGenerator');
const authorize = require('../middleware/authorize');

// const { Op } = Sequelize;

// authorization
router.post('/register', validInfo, async (req, res) => {
  const {
    email, firstname, lastname, password
  } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const [response, created] = await user.findOrCreate({
      defaults: {
        firstname,
        lastname,
        password: bcryptPassword,
      },
      where: {
        email,
      },
    });

    if (!created) {
      return res.status(401).json('User already exists!');
    }

    const jwtToken = jwtGenerator(response.dataValues.id);

    return res.json({ jwtToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server error');
  }
});

router.post('/login', validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    await user
      .findOne({
        where: { email },
      })
      .then((user1) => {
        if (!user1 || !bcrypt.compareSync(password, user1.password)) {
          return res.status(401).json('Invalid Credential');
        }

        const jwtToken = jwtGenerator(user1.id);
        return res.json({ jwtToken });
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json(`Internal server error${err}`);
      });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Server error');
  }
});

router.post('/verify', authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
