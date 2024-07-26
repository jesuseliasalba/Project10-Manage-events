require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { ConnectDB } = require("./src/config/db");
const userRoutes = require("./src/api/routes/user");
const eventRoutes = require("./src/api/routes/event");
const cloudinary = require("cloudinary").v2;

ConnectDB();

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
});

app.use("/user", userRoutes);
app.use("/event", eventRoutes);

app.use((error, req, res, next) => {
  return res
    .status(error.status || 404)
    .json(error.message || "Unexpected error");
});

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
