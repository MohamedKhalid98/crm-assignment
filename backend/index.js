require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const { User } = require("./src/models/user");

app.use(express.json());
app.use(cors());

require("./src/startup/db")();
require("./src/startup/routes")(app);

const PORT = process.env.port || 4800;

app.listen(PORT, () => {
  //TODO :: logger
  console.log(`Server running on port ${PORT}`);
});
