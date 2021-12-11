const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    available: {
      type: Boolean,
      default: true
    },
    types: {
      type: [String],
      required: true
    },
    price: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    photos: {
      type: [String],
      default: []
    },
    sizes: {
      type: [
        {
          size: String,
          quantity: Number
        }
      ],
      default: []
    },
  },
  {
    timestamps: true
  }
);

const ArticleModel = mongoose.model("article", ArticleSchema);

module.exports = ArticleModel;