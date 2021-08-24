/* eslint-disable camelcase */
const router = require('express').Router();

const authorize = require('../middleware/authorize');
const { country, state, city } = require('../models');

router.get('/countries', authorize, async (req, res) => {
  try {
    await country.findAll()
      .then((allCountries) => {
        res.status(200).json(allCountries);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/states/:country_id', authorize, async (req, res) => {
  try {
    await state.findAll({
      where: {
        country_id: req.params.country_id
      }

    }).then((allStates) => {
      console.log(allStates);
      res.status(200).json(allStates);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/cities/:country_id/:state_id', authorize, async (req, res) => {
  try {
    await city.findAll({
      where: {
        state_id: req.params.state_id,
        country_id: req.params.country_id
      }

    }).then((allCities) => {
      console.log(allCities);
      res.status(200).json(allCities);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
