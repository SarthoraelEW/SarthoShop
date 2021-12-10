const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true
    },
    type: {
      type: String,
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
      type: [String],
      default: []
    },
  },
  {
    timestamps: true
  }
);

const ArticleModel = mongoose.model("article", ArticleSchema);

module.exports = ArticleModel;