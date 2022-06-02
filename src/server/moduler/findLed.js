const sql = require('./db');

const findLed = function (device) {
  this.idled = device.idled;
  this.fan_id = device.fan_id;
  this.tmpid = device.tmpid;
  this.status = device.status;
  this.speed = device.speed;
  this.className = device.className;
  this.tmp = device.tmp;
  this.hum = device.hum;
  this.date = device.date;
};

findLed.findLedStatus = (device, result) => {
  // device `smarthome`.`led` SET `status` = 'OFF',
  //`className` = 'lightOff' WHERE (`idled` = '1');

  const query = `select * from led where status = "${device.status}";`;
  sql.query(query, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = findLed;
