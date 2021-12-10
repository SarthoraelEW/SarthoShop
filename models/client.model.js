const mongoose = require("mongoose");
const { isEmail, isMobilePhone, isStrongPassword } = require("validator");
const bcrypt = require("bcrypt");

const ClientSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    verifyEmail: {
      type: {
        isVerified: Boolean,
        token: String,
      },
      default: null
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      validate: [isMobilePhone],
      default: "+33700000000",
    },
    verifyPhoneNumber: {
      type: {
        isVerified: Boolean,
        token: String,
      },
      default: null
    },
    address: {
      type: {
        country: String,
        state: String,
        city: String,
        zip: String,
        numberAndStreet: String,
        more: String
      },
      default: null,
    },
    cards: {
      type: [
        {
          cardName: String,
          cardNumber: String,
          expiration: String,
        },
      ],
      default: [],
    },
    commands: {
      type: [String],
      default: [],
    },
    SAVRequest: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

ClientSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

ClientSchema.statics.login = async function (email, password) {
  const client = await this.findOne({ email });
  if (client) {
    const auth = await bcrypt.compare(password, client.password);
    if (auth) {
      return client;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const ClientModel = mongoose.model("client", ClientSchema);

module.exports = ClientModel;