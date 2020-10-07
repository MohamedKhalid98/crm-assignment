const mongoose = require("mongoose");
const config = require("config");

const { User, hashPassword } = require("./src/models/user");

async function seed() {
  await mongoose.connect(config.get("db"));
  let password = await hashPassword("test123");

  let user = await User.findOne({ email: "admin@app.com" });
  if (user) return mongoose.disconnect();

  const admin = {
    name: "Admin",
    email: "admin@app.com",
    password,
    role: "admin",
  };
  user = new User(admin);
  await user.save();

  mongoose.disconnect();
  console.info("done");
}
seed();
