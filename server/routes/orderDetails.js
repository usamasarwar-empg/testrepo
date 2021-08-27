/* eslint-disable camelcase */
const router = require('express').Router();

const authorize = require('../middleware/authorize');
const { orderDetails } = require('../models');

// get orderDetails
router.get('/', authorize, async (req, res) => {
  try {
    await orderDetails.findAll()
      .then((orderDetailsResult) => {
        console.log(orderDetailsResult);
        res.status(200).json(orderDetailsResult);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// add orderDetails
router.post('/', authorize, async (req, res) => {
  console.log('posting orderDetails');
  try {
    const {
      order_id,
      lineitem_id,
      order_deliver_date,
      IMEI_1,
      IMEI_2,
      serial_number,
      order_date,
    } = req.body;

    const newOrderDetails = await orderDetails.create({
      user_id: req.user.id,
      order_id,
      lineitem_id,
      order_deliver_date,
      IMEI_1,
      IMEI_2,
      serial_number,
      order_date
    });
    res.status(200).json(newOrderDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// update orderDetails
router.put('/:order_id', authorize, async (req, res) => {
  console.log('updating order details');
  try {
    const {
      order_id,
      lineitem_id,
      order_deliver_date,
      IMEI_1,
      IMEI_2,
      serial_number,
      order_date,
    } = req.body;

    const updateOrderDetails = await orderDetails.update({
      user_id: req.user.id,
      order_id,
      lineitem_id,
      order_deliver_date,
      IMEI_1,
      IMEI_2,
      serial_number,
      order_date

    }, { where: { order_id: req.params.order_id } });

    if (updateOrderDetails[0] === 0) {
      return res.status(400).json(updateOrderDetails);
    }

    res.status(200).json(updateOrderDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// delete orderDetails
router.delete('/:order_id', authorize, async (req, res) => {
  try {
    const deleteOrderDetails = await orderDetails.destroy(
      { where: { order_id: req.params.order_id } }
    );

    if (deleteOrderDetails === 0) {
      return res.status(400).json(deleteOrderDetails);
    }
    res.status(200).json(deleteOrderDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
