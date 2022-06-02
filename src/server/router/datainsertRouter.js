const express = require('express');
const insertConroller = require('../controllers/datainsertController');
const router = express.Router();
router.route('/led/insert').get(insertConroller.insertLed);
router.route('/fan/insert').get(insertConroller.insertFan);
router.route('/tmphum/insert').get(insertConroller.inserttmphum);
module.exports = router;
