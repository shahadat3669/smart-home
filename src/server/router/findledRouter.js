const express = require('express');
const findLedController = require('../controllers/findLedController');
const router = express.Router();

router.route('/led/status/').post(findLedController.ledstatus);

module.exports = router;
