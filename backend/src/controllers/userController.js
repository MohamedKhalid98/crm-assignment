const { forEach } = require("lodash");
const _ = require("lodash");

const { User, validate, hashPassword } = require("../models/user");

const registerUser = async (req, res) => {
  try {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists");

    let password = await hashPassword(req.body.password);
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: password,
      role: req.body.role,
    });

    await user.save();

    const token = user.generateAuthToken();
    res
      .header("access-control-expose-headers", "x-auth-token")
      .header("x-auth-token", token)
      .send(_.pick(user, ["name", "email", "role"]));
  } catch (ex) {
    console.log(ex.errors);
    res.status(500).send("Something went wrong");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-__v -password");
    res.send(users);
  } catch (e) {
    console.log(e);
    res.status(500).send("something went wrong ");
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-__v -password");
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send("something went wrong");
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).select("-__v");
    if (user) return res.send(user);
    res.status(404).send("no user for the givin id");
  } catch (e) {
    console.log(e);
    res.status(500).send("something went wrong");
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        ...req.body,
      },
    }).select("-__v");
    if (user) return res.send(user);
    res.status(404).send("no lead for the givin id");
  } catch (e) {
    console.log(e);
    res.status(500).send("something went wrong");
  }
};
const addUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    let user = new User(_.pick(req.body, ["name", "email", "phone"]));

    user = await user.save();

    res.send(_.pick(user, ["_id", "name", "email", "phone"]));
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  registerUser,
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
};
