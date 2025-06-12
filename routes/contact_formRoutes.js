const express = require("express");
const {
  contactHandler,
  signupHandler,
} = require("../controllers/authControllers");
const router = express.Router();

router.post("/contact", contactHandler);
router.post("/signup", signupHandler);

module.exports = router;
