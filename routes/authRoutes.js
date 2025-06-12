const express = require("express");
const {
  
  signupHandler,
} = require("../controllers/authControllers");
const router = express.Router();

//router.post("/login", loginHandler);
router.post("/signup", signupHandler);

module.exports = router;
