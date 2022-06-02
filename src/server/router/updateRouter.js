const express = require('express');
const upddateController = require('../controllers/updateController');
const router = express.Router();

router.route('/led/update/').post(upddateController.updateled);
router.route('/device').post(upddateController.updateDevice);
// router.route('/device/update2/').post(upddateController.updateDevice2);

module.exports = router;
