const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    mail: { type: String, required: true, trim: true },
    rol: { type: String, required: true, default: "user" },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model("users", userSchema, "users");

module.exports = User;
