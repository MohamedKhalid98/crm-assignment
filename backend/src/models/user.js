const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
  },
  role: {
    type: String,
    default: "basic",
    enum: ["basic", "staff", "admin"],
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
    },
    config.get("jwtPrivateKey")
  );

  return token;
};

const User = mongoose.model("user", userSchema);

function validate(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    password: Joi.string().min(4).required(),
  });
  return schema.validate(user);
}
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
module.exports = { User, validate, hashPassword };
