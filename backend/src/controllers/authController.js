const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

module.exports.authenticateUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();
    res
      .header("access-control-expose-headers", "x-auth-token")
      .header("x-auth-token", token)
      .send(_.pick(user, ["name", "email", "role"]));
  } catch (error) {
    res.status(500).send(error);
  }
};

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}
