const ledStatus = require('../moduler/dataretrieve');
// const sleep = (milliseconds) => {
//   return new Promise(resolve => setTimeout(resolve, milliseconds))
// }

// /*Use like so*/

// async function timeSensativeAction() { //must be async func
//   //do something here
//   await sleep(5000) //wait 5 seconds
//   //continue on...
// }
exports.led = (req, res) => {
  ledStatus.allLed((err, data) => {
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
exports.fan = (req, res) => {
  ledStatus.allFan((err, data) => {
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
exports.tmphum = (req, res) => {
  ledStatus.alltmphum((err, data) => {
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
exports.allDevice = (req, res) => {
  ledStatus.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occured in inventoryReport function',
      });
    } else {
      for (let i = 0; i < data[0].length; i++) {
        if (data[0][i].status == 'ON') {
          data[0][i].status = 1;
        } else {
          data[0][i].status = 0;
        }

        delete data[0][i].className;
      }
      for (let i = 0; i < data[1].length; i++) {
        if (data[1][i].status == 'ON') {
          data[1][i].status = 1;
        } else {
          data[1][i].status = 0;
        }
        data[1][i].speed = 255 * (data[1][i].speed / 100);
      }
      let device = {
        load: {
          lights: data[0],
          fan: data[1],
        },
        sensor: data[2],
      };
      res.send(device);
    }
  });
};
