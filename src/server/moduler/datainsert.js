const sql = require('./db');
var curdate = new Date();
const datainsert = function (insert) {
  this.status = insert.status;
  this.speed = insert.speed;
  this.tmp = insert.tmp;
  this.hum = insert.hum;
  this.date = handleDate(curdate);
};

datainsert.insertled = result => {
  sql.query("INSERT INTO led(status) values('OFF')", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res);
  });
};

datainsert.insertFan = result => {
  sql.query("INSERT INTO fan(speed,status) values('20','OFF')", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res);
  });
};
datainsert.inserttmphum = result => {
  sql.query("INSERT INTO tmphum(tmp,hum) values('0.00','0.00')", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res);
  });
};

const handleDate = dataD => {
  let data = new Date(dataD);
  let month = data.getMonth() + 1;
  let day = data.getDate();
  let year = data.getFullYear();
  const postDate = year + '-' + month + '-' + day;
  return postDate;
};

module.exports = datainsert;
