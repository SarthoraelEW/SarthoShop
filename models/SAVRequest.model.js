const mongoose = require('mongoose');
const { isEmail, isMobilePhone } = require('validator');

const SAVRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      validate: [isEmail],
      required: true
    },
    phoneNumber: {
      type: String,
      validate: [isMobilePhone],
      default: ""
    },
    message: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: "En attente"
    }
  }
);

const SAVRequestModel = mongoose.model("SAVRequest", SAVRequestSchema);

module.exports = SAVRequestModel;