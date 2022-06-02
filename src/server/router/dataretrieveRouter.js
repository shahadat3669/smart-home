const express = require('express');
const insertConroller = require('../controllers/dataretrieveController');
const router = express.Router();

router.route('/led').get(insertConroller.led);
router.route('/fan').get(insertConroller.fan);
router.route('/tmphum').get(insertConroller.tmphum);
router.route('/device').get(insertConroller.allDevice);
module.exports = router;
