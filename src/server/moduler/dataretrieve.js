const sql = require('./db');

const deviceStatus = function (led) {
  this.status = led.status;
};

deviceStatus.allLed = result => {
  sql.query('SELECT * FROM led', (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};
deviceStatus.allFan = result => {
  sql.query('SELECT * FROM fan', (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};
deviceStatus.alltmphum = result => {
  sql.query('SELECT * FROM tmphum', (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};
deviceStatus.lastTemp = result => {
  sql.query('SELECT * FROM tmphum ORDER BY id DESC LIMIT 1;', (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res[0]);
  });
};

deviceStatus.getAll = result => {
  // let q1 = `SELECT * FROM led;SELECT * FROM fan;`;
  let q1 = `SELECT * FROM led;SELECT * FROM fan;SELECT * FROM sensor;`;

  sql.query(q1, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = deviceStatus;
