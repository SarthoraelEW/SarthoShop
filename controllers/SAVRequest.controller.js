const SAVRequestModel = require("../models/SAVRequest.model");
const ClientModel = require("../models/client.model");
const ObjectId = require("mongoose").Types.ObjectId;
const { isEmpty } = require("../utils/isEmpty.utils");

/************** Create SAVRequest **************/

exports.sendSAVRequest = async (req, res) => {
  const { name, email, message, phoneNumber, client } = req.body;

  try {
    const newSAVRequest = new SAVRequestModel({
      name: name,
      email: email,
      message: message,
      phoneNumber: isEmpty(phoneNumber) ? "" : phoneNumber,
      client: isEmpty(client) ? "" : client,
    });
    const SAVRequest = await newSAVRequest.save();
    if (!isEmpty(client)) {
      ClientModel.findByIdAndUpdate(
        client,
        {
          $addToSet: { SAVRequest: SAVRequest._id },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
          if (!err) res.send(SAVRequest);
          else return res.status(500).json(err);
        }
      );
    }
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

    const client = SAVRequest.client;

    await SAVRequestModel.findByIdAndDelete(req.params.id);

    if (!isEmpty(client)) {
      ClientModel.findByIdAndUpdate(
        client,
        {
          $pull: { SAVRequest: SAVRequest._id },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
          if (!err)
            res.send("SAVRequest " + SAVRequest._id + " succesfully deleted");
          else return res.status(500).json(err);
        }
      );
    } else {
      res.send("SAVRequest " + SAVRequest._id + " succesfully deleted");
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};
