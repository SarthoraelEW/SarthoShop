const ClientModel = require("../models/client.model");
const twilio = require("twilio");
const { randomCode } = require("../utils/randomCode.utils");
const ObjectId = require("mongoose").Types.ObjectId;
const { isMobilePhone } = require("validator");

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

exports.addCard = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const { cardName, cardNumber, expiration } = req.body;
  const newCard = { cardName, cardNumber, expiration };

  try {
    ClientModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { cards: newCard }
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

exports.deleteCard = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const cardId = req.body.cardId;

  try {
    ClientModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          cards: {
            _id: cardId
          }
        }
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

/************** Delete client **************/

exports.deleteClient = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json("ID unknow: " + req.params.id);

  ClientModel.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) res.send("Client " + docs._id + " successfully deleted");
    else return res.status(500).send(err);
  });
};

/************** Email verification **************/

exports.verifyEmail = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json("ID unknow: " + req.params.id);

  const client = await ClientModel.findById(req.params.id);
  if (client.verifyEmail.token === req.params.token) {
    try {
      ClientModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            verifyEmail: { isVerified: true, token: "" },
          },
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
  } else {
    return res.status(400).send("Token unknow: " + req.params.token);
  }
};

/************** Phone verification **************/

exports.getVerificationCode = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json("ID unknow: " + req.params.id);

  const { phoneNumber } = req.body;
  if (!isMobilePhone(phoneNumber))
    return res.status(400).send("Invalid phone number: " + phoneNumber);

  const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  const verificationToken = randomCode(6);

  try {
    ClientModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          phoneNumber: phoneNumber,
          verifyPhoneNumber: { isVerified: false, token: verificationToken }
        }
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

  client.messages
    .create({
      body: `Your verification code is: ${verificationToken}`,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
};

exports.checkVerificationCode = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const client = await ClientModel.findById(req.params.id);
  const clientToken = client.verifyPhoneNumber.token;

  if (clientToken === req.body.token) {
    client.verifyPhoneNumber = { isVerified: true, token: "" };
    await client.save();
    res.send("Successfully verified");
  } else {
    return res.status(400).send("Incorrect code: " + req.body.token);
  }
};
