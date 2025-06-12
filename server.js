const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
// middleware to parse json body
app.use(express.json());
app.use(cors());
const authRoutes = require("./routes/authRoutes");

const uploadRoutes = require("./routes/uploadRoutes");
const contact_formRoutes = require("./routes/contact_formRoutes");
const contentRoutes = require("./routes/contentRoutes");
app.use("/uploads", express.static("uploads"));
// use routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/contact_form", contact_formRoutes);

app.use("/api/v1/content", contentRoutes);
app.get("/", (req, res) => {
  res.send("Server is listening");
});
//hello my name is anish...learning github

const PORT = process.env.PORT;

// const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
