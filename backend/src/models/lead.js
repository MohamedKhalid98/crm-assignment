const mongoose = require("mongoose");
const Joi = require("joi");

const leadSchema = new mongoose.Schema({
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
  },
  phone: {
    type: Number,
    minlength: 6,
  },
});

const Lead = mongoose.model("lead", leadSchema);

function validate(lead) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.number().min(6),
  });
  return schema.validate(lead);
}
module.exports = { Lead, validate };
