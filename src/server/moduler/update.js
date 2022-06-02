const sql = require('./db');

const dataupdate = function (update) {
  this.idled = update.idled;
  this.fan_id = update.fan_id;
  this.tmpid = update.tmpid;
  this.status = update.status;
  this.speed = update.speed;
  this.className = update.className;
  this.tmp = update.tmp;
  this.hum = update.hum;
  this.date = update.date;
};

dataupdate.updateled = (update, result) => {
  // UPDATE `smarthome`.`led` SET `status` = 'OFF',
  //`className` = 'lightOff' WHERE (`idled` = '1');

  sql.query(
    `update led set status ='${update.status}', className = '${update.className}' where idled = ${update.idled}`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};
const UpdateQueryHandler = async (SqlQuery, result) => {
  await sql.query(SqlQuery, res => {
    try {
      result(null, res);
    } catch (error) {
      result(err, null);
      return;
    }
  });
};

dataupdate.updateDevice = (update, result) => {
  var SqlQuery = ``;
  var query4 = '';
  if (update.idled !== undefined) {
    query4 += `update led set status ='${update.status}', className = '${update.className}' where idled = ${update.idled}`;
    // SqlQuery = query1;
    // UpdateQueryHandler(SqlQuery, result);
  } else if (update.fan_id !== undefined) {
    query4 += `update fan set status ='${update.status}', speed = ${update.speed} where fan_id = ${update.fan_id};`;
    // SqlQuery = query2;
    // UpdateQueryHandler(SqlQuery, result);
  }
  if (update.sensor !== undefined) {
    for (let i = 0; i < update.sensor.length; i++) {
      query4 += `update sensor set status = ${update.sensor[i].status} where id = ${update.sensor[i].id};`;
    }
    if (update.temphum !== undefined) {
      query4 += `INSERT INTO tmphum(tmp,hum) values(${update.temphum.tmp},${update.temphum.hum});`;
    }
  }
  SqlQuery = query4;
  UpdateQueryHandler(SqlQuery, result);
  query4 = '';
};

module.exports = dataupdate;
