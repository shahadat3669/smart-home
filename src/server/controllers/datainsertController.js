const datainsert = require('../moduler/datainsert');
exports.insertLed = (req, res) => {
    datainsert.insertled((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer.",
            });
        else {
            res.send(data);
        }
    });
};
exports.insertFan = (req, res) => {
    datainsert.insertFan((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer.",
            });
        else {
            res.send(data);
        }
    });
};

exports.inserttmphum = (req, res) => {
    datainsert.inserttmphum((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer.",
            });
        else {
            res.send(data);
        }
    });
};