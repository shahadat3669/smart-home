const ledFIndStatus = require('../moduler/findLed');
exports.ledstatus = (req, res) => {
  ledFIndStatus.findLedStatus(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occured in inventoryReport function',
      });
    } else {
      res.send(data);
    }
  });
};
