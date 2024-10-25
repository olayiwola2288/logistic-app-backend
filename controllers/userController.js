const User = require("../models/userModel");
const jwt = require("../node_modules/jsonwebtoken/");

const signToken = (payload) => {
  const token = jwt.sign({ ...payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

const signInUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(async (user) => {
      if (user && (await user.comparePassword(req.body.password))) {
        console.log("Signed In");
        return res.status(200).json({
          message: "User signed in successfully",
          token: signToken({ userId: user._id }),
        });
      } else {
        // res.cookies("token", { httpOnly: false, expiresIn: 5000 });
        return res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to sign in user" });
    });
};

const signUpUser = (req, res) => {
  req.body.role = "user";
  User.create(req.body)
    .then((result) => {
      console.log(result);
      result.password = undefined;
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

// Get my details
module.exports = { signInUser, signUpUser, getUsers, getUserById, updateUser };
