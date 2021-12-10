const ClientModel = require("../models/client.model");
const ObjectId = require("mongoose").Types.ObjectId;

/************** GET Method **************/

exports.getClient = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  ClientModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log(err);
  }).select("-password");
};

/************** Modify client **************/

exports.updateAddress = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const { country, state, city, zip, numberAndStreet, more } = req.body;

  const newAddress = { country, state, city, zip, numberAndStreet, more };

  try {
    ClientModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { address: newAddress },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.addCard = async (req, res) => {};

exports.deleteCard = async (req, res) => {};

/************** Delete client **************/

exports.deleteClient = async (req, res) => {};

/************** Email verification **************/

exports.verifyEmail = async (req, res) => {};

/************** Phone verification **************/

exports.getVerificationCode = async (req, res) => {};

exports.checkVerificationCode = async (req, res) => {};
