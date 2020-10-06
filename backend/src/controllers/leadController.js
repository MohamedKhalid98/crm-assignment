const { Lead, validate } = require("../models/lead");
const _ = require("lodash");

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({});
    res.send(leads);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};
const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).select("-__v");
    if (lead) return res.send(lead);
    res.status(404).send("no lead for the givin id");
  } catch (e) {
    res.status(500).send("something went wrong");
  }
};
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id).select("-__v");
    if (lead) return res.send(lead);
    res.status(404).send("no lead for the givin id");
  } catch (e) {
    res.status(500).send("something went wrong");
  }
};
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, {
      $set: {
        ...req.body,
      },
    }).select("-__v");
    if (lead) return res.send(lead);
    res.status(404).send("no lead for the givin id");
  } catch (e) {
    res.status(500).send("something went wrong");
  }
};
const addLead = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    let lead = new Lead(_.pick(req.body, ["name", "email", "phone"]));

    lead = await lead.save();

    res.send(_.pick(lead, ["_id", "name", "email", "phone"]));
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getLeads,
  addLead,
  getLead,
  deleteLead,
  updateLead,
};
