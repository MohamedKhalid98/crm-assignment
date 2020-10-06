const express = require("express");
const router = express.Router();

const {
  registerUser,
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

router.get("/", [auth, admin], getUsers);
router.get("/:id", [auth, admin], getUser);
router.delete("/:id", [auth, admin], deleteUser);
router.put("/:id", [auth, admin], updateUser);

router.post("/", registerUser);

module.exports = router;
