const SAVRequestModel = require("../models/SAVRequest.model");
const ObjectId = require("mongoose").Types.ObjectId;
const { isEmpty } = require("../utils/isEmpty.utils");

/************** Create SAVRequest **************/

exports.sendSAVRequest = async (req, res) => {
  const { name, email, message, phoneNumber } = req.body;

  try {
    const newSAVRequest = new SAVRequestModel({
      name: name,
      email: email,
      message: message,
      phoneNumber: isEmpty(phoneNumber) ? "" : phoneNumber,
    });
    const SAVRequest = await newSAVRequest.save();
    if (!err) res.send(SAVRequest);
    else return res.status(500).json(err);
  } catch (err) {
    return res.status(500).json(err);
  }
};

/************** Get Methods **************/

exports.getAllSAVRequests = async (req, res) => {
  SAVRequestModel.find({}, (err, docs) => {
    if (!err) res.send(docs);
    else return res.status(500).json(err);
  });
};

exports.getSAVRequest = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  SAVRequestModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else return res.status(500).json(err);
  });
};

exports.getSAVRequestsWithState = async (req, res) => {
  SAVRequestModel.find({ state: req.params.state }, (err, docs) => {
    if (!err) res.send(docs);
    else return res.status(500).json(err);
  });
};

/************** Modify State **************/

exports.updateState = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    SAVRequestModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { state: req.body.state },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};

/************** Delete SAVRequest **************/

exports.deleteSAVRequest = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    const SAVRequest = await SAVRequestModel.findById(req.params.id);
    await SAVRequestModel.findByIdAndDelete(req.params.id);
    res.send("SAVRequest " + SAVRequest._id + " succesfully deleted");
  } catch (err) {
    return res.status(500).send(err);
  }
};
