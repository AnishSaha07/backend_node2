const express = require("express");
const { getAllContent, getAllCat } = require("../controllers/authControllers");
const router = express.Router();
router.get("/all", getAllContent);
router.get("/allcat", getAllCat);

module.exports = router;
