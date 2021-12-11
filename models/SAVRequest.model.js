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
      maxlength: 1000,
      required: true
    },
    state: {
      type: String,
      default: "En attente"
    }
  }
);

const SAVRequestModel = mongoose.model("SAVRequest", SAVRequestSchema);

module.exports = SAVRequestModel;