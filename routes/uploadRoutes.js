const express = require("express");
const {
  uploadFile,
  createContent,
  updateContent,
  deleteContent,
} = require("../controllers/uploadControllers");
const { upload } = require("../utils/fileUpload");

const router = express.Router();

// For uploading image or video
router.post("/upload", upload.single("file"), uploadFile);

// Content creation with image/video
router.post("/add", upload.single("file"), createContent);

router.put("/edit", upload.single("file"), updateContent);
router.post("/delete", deleteContent);

module.exports = router;
