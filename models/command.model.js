const mongoose = require('mongoose');

const CommandSchema = new mongoose.Schema(
  {
    client: {
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
      },
      required: true
    },
    content: {
      type: [
        {
          article: String,
          amount: Number
        }
      ],
      required: true
    },
    state: {
      type: String,
      default: "En cours d'expédition"
    },
    totalCost: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const CommandModel = mongoose.model('command', CommandSchema);

module.exports = CommandModel;