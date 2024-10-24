const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const model = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    match: /^[A-Za-z]+$/,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    match: /^[A-Za-z]+$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
  },
  phoneNumber: {
    type: String,
    required : true,
    unique: true,
    match:  /^\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}$/,
  },
  password: {
    type: String,
    required: true,
    match:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W\S]{8,}$/,
  },
  role: { type: String, required: true, enum: ["user", "admin", "dispatch"] },
});

model.pre("save", function (next) {
  bcrypt
    .hash(this.password, 10)
    .then((result) => {
      console.log(result);
      this.password = result;
      next();
    })

    .catch((err) => {
      console.log(err);
    });
});

model.methods.comparePassword = async function (passwordToConfirm) {
  return await bcrypt.compare(passwordToConfirm, this.password);
};

const User = mongoose.model("User", model);
module.exports = User;
