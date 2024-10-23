const mongoose = require("mongoose");

const model = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3 },
  email: { type: String, required: true, unique: true },
  phone: Number,
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["user", "admin", "dispatch"] },
});

const User = mongoose.model("User", model);
module.exports = User;
