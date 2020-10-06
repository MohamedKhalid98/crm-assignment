const Users = require("../routes/users");
const Auth = require("../routes/auth");
const Leads = require("../routes/leads");

module.exports = function (app) {
  app.use("/api/users", Users);
  app.use("/api/auth", Auth);
  app.use("/api/leads", Leads);
};
