const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const model = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3 },
  email: { type: String, required: true, unique: true },
  phone: Number,
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["user", "admin", "dispatch"] },
});

model.pre("save", function () {
  bcrypt.hash(this.password, 10).then((result) => {
    this.password = result;
  });
});

model.methods.comparePassword = async function (passwordToConfirm) {
  return await bcrypt.compare(passwordToConfirm, this.password);
};

const User = mongoose.model("User", model);
module.exports = User;
