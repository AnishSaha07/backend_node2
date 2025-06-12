// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// // Specify file format that can be saved
// function fileFilter(req, file, cb) {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/png"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only jpeg, jpg and png files are allowed!"), false);
//   }
// }

// // file limits
// // let maxSize = 1 * 1024 * 1024;
// // function limits(req, file, cb) {
// //   // cb({
// //   //   fieldNameSize: 255,
// //   //   fileSize: maxSize,
// //   //   files: 1,
// //   //   fields: 1,
// //   // });
// //   { fileSize: 5 * 1000 * 1000 }
// //   cb(new Error("File should be below 250kb"), false);
// // }

// const upload = multer({
//   storage: storage,
// });

// module.exports = { upload };

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // same folder for both images and videos
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

// Accept images and videos
function fileFilter(req, file, cb) {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "video/mp4",
    "video/webm",
    "video/ogg",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed!"), false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max (adjust as needed)
  },
});

module.exports = { upload };
