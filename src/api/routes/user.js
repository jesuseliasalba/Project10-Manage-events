const express = require("express");
const {
  registerUser,
  loginUser,
  getUserInfo,
  getUsers,
  updateUser,
  updateOwnUser,
  deleteOwnUser,
  deleteUser,
} = require("../controllers/user");
const { isAdmin, isAuth } = require("../../middlewares/auth");
const { upload } = require("../../middlewares/files");
const userRoutes = express.Router();

userRoutes.post("/register", upload.fields([{ name: "img" }]), registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/me", [isAuth], getUserInfo);
userRoutes.get("/", [isAdmin], getUsers);
userRoutes.put("/:id", [isAdmin], upload.fields([{ name: "img" }]), updateUser);
userRoutes.put("/", [isAuth], upload.fields([{ name: "img" }]), updateOwnUser);
userRoutes.delete("/:id", [isAdmin], deleteUser);
userRoutes.delete("/", [isAuth], deleteOwnUser);

module.exports = userRoutes;
