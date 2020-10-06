const express = require("express");
const router = express.Router();
const {
  addLead,
  getLeads,
  getLead,
  deleteLead,
  updateLead,
} = require("../controllers/leadController");
const auth = require("../middleware/auth");

function permissions(req, res, next) {
  console.log(req.user);
  if (req.user.role == "staff" || req.user.role == "admin") return next();

  res.status(403).send("You done have enough permissions to do this action");
}

router.get("/", getLeads);
router.get("/:id", getLead);
router.delete("/:id", [auth, permissions], deleteLead);
router.put("/:id", [auth, permissions], updateLead);
router.post("/", [auth, permissions], addLead);

module.exports = router;
