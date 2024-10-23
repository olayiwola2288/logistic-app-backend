const User = require("../models/userModel");
const jwt = require("../node_modules/jsonwebtoken/");
const bcrypt = require("bcrypt");

const signInUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(async (user) => {
      if (user && (await bcrypt.compare(req.body.password, user.password))) {
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );
        return res
          .status(200)
          .json({ message: "User signed in successfully", token });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to sign in user" });
    });
};

const signUpUser = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((result) => {
    req.body.password = result;
    req.body.role = "user";
    User.create(req.body)
      .then((result) => {
        console.log(result);
        res
          .status(201)
          .json({ message: "User created successfully", data: result });
      })
      .catch((err) => {
        console.log(err);
        console.log("User not created");
        res
          .status(500)
          .json({ message: "Failed to create user", message: err.message });
      });
  });
};

const getUsers = (req, res) => {
  User.find()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res
        .status(200)
        .json({ message: "User fetched successfully", data: user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to fetch user" });
    });
};

const getUserById = (req, res) => {
  User.findOne({ id: req.params._id })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res
        .status(200)
        .json({ message: "User fetched successfully", data: user });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Failed to fetch user", message: err.message });
    });
};

const updateUser = (req, res) => {
  console.log(req.user);
  // Check if the person editing has the right (logged in user or admin)
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res
        .status(200)
        .json({ message: "User updated successfully", data: user });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Failed to update user", message: err.message });
    });
};

module.exports = { signInUser, signUpUser, getUsers, getUserById, updateUser };
