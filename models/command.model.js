const mongoose = require('mongoose');
const { isEmail } = require('validator');

const CommandSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: [isEmail],
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    address: {
      type: {
        country: String,
        state: String,
        city: String,
        street: String,
        zip: String,
        more: String
      },
      required: true
    },
    content: {
      type: [
        {
          article: String,
          size: String,
          quantity: Number
        }
      ],
      required: true
    },
    totalCost: {
      type: String,
      required: true
    },
    client: {
      type: String,
      default: ""
    },
    state: {
      type: String,
      default: "expedition"
    },
    instruction: {
      type: String,
      maxlength: 1000,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const CommandModel = mongoose.model('command', CommandSchema);

module.exports = CommandModel;