const updatedata = require('../moduler/update');
const dataretrieve = require('../moduler/dataretrieve');

var curdate = new Date();

const handleDate = dataD => {
  let data = new Date(dataD);
  let month = data.getMonth() + 1;
  let day = data.getDate();
  let year = data.getFullYear();
  const postDate = year + '-' + month + '-' + day;
  return postDate;
};

exports.updateled = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  const Updatedata = new updatedata({
    idled: req.body.idled,
    status: req.body.status,
    className: req.body.className,
  });

  updatedata.updateled(Updatedata, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.idled}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Customer with id ' + req.params.idled,
        });
      }
    } else
      res.status(201).json({
        type: 'success',
        message: 'Led update successuflly',
      });
  });
};

exports.updateDevice = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  // res.send(req.body);
  if (req.body.temphum !== undefined) {
    dataretrieve.lastTemp((err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || 'Some error occurred in data retrieve function',
        });
      } else {
        if (
          req.body.temphum[0].value === data.tmp &&
          req.body.temphum[1].value === data.hum
        ) {
          delete req.body['temphum'];
        }
        if (req.body.temphum) {
          temp = {
            tmp: req.body.temphum[0].value,
            hum: req.body.temphum[1].value,
          };
          delete req.body['temphum'];
          req.body['temphum'] = temp;
        }
        updatedata.updateDevice(req.body, (err, data) => {
          if (err) {
            res.status(400).send({ message: 'update device have some error' });
          } else {
            res.send({
              message: 'success',
              data: req.body,
            });
          }
        });
      }
    });
  } else {
    updatedata.updateDevice(req.body, (err, data) => {
      if (err) {
        res.status(400).send({ message: 'update device have some error' });
      } else {
        res.send({
          message: 'success',
          data: req.body,
        });
      }
    });
  }
};

// exports.updateDevice2 = (req, res) => {
//   if (!req.body) {
//     res.status(400).send({
//       message: 'Content can not be empty!',
//     });
//   }

//   // updatedata.updateDevice2(req.body, (err, data) => {
//   //   if (err) {
//   //     res.status(400).send({ message: 'update device have some error' });
//   //   } else {
//   //     res.send({
//   //       message: 'success',
//   //     });
//   //   }
//   // });
// }
