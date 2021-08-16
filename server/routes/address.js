/* eslint-disable camelcase */
const router = require('express').Router();

const authorize = require('../middleware/authorize');
const { address } = require('../models');

// get all addresses for admin , and user's address for other users
router.get('/', authorize, async (req, res) => {
  try {
    // if (req.user.id === 1000) { // admin can get all addresses
    //   await address.findAll()
    //     .then((addressResult) => {
    //       // console.log(addressResult);
    //       res.json(addressResult);
    //     });
    // } else { // for other users
    await address.findAll({
      where: {
        user_id: req.user.id
      }
    })
      .then((addressResult) => {
        // console.log(addressResult);
        res.json(addressResult);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// create an address
router.post('/', authorize, async (req, res) => {
  console.log('posting address');
  try {
    const {
      firstname,
      lastname,
      address1,
      address2,
      city_name,
      zipcode,
      phone,
      state_name,
      alternative_phone,
      company,
      state_id,
      country_id,
      latitude,
      longitude,
      street,
      building,
      floor
    } = req.body;

    const newAddress = await address.create({
      user_id: req.user.id,
      firstname,
      lastname,
      address1,
      address2,
      city_name,
      zipcode,
      phone,
      state_name,
      alternative_phone,
      company,
      state_id,
      country_id,
      latitude,
      longitude,
      street,
      building,
      floor
    });
    res.json(newAddress);
  } catch (err) {
    console.error(err.message);
  }
});

// update an address
router.put('/', authorize, async (req, res) => {
  console.log('updating address');
  try {
    const {
      firstname,
      lastname,
      address1,
      address2,
      city_name,
      zipcode,
      phone,
      state_name,
      alternative_phone,
      company,
      state_id,
      country_id,
      latitude,
      longitude,
      street,
      building,
      floor
    } = req.body;

    const updateAddress = await address.update({
      firstname,
      lastname,
      address1,
      address2,
      city_name,
      zipcode,
      phone,
      state_name,
      alternative_phone,
      company,
      state_id,
      country_id,
      latitude,
      longitude,
      street,
      building,
      floor
    }, { where: { user_id: req.user.id } });

    if (updateAddress[0] === 0) {
      return res.status(400).json(updateAddress);
    }

    res.json(updateAddress);
  } catch (err) {
    console.error(err.message);
  }
});

// delete an address
router.delete('/', authorize, async (req, res) => {
  try {
    const deleteAddress = await address.destroy({ where: { user_id: req.user.id } });

    if (deleteAddress === 0) {
      return res.status(400).json(deleteAddress);
    }

    res.json(deleteAddress);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
