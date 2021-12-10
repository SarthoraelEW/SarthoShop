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
      validate: [isStrongPassword],
      required: true,
    },
    phoneNumber: {
      type: String,
      validate: [isMobilePhone],
      default: "",
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
        street: String,
        zip: String,
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
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const ClientModel = mongoose.model("client", ClientSchema);

module.exports = ClientModel;