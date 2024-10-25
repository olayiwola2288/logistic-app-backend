const express = require("express");
const app = express();
const userRouter = require("./router/userRoutes");
const orderRouter = require("./router/orderRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({ origin: ["https://logistic-azure.vercel.app", "http://localhost:5000"] })
);

app.use(function (req, res, next) {
  console.log(`${req.method} request to ${req.url}`);

  next();
});

app.use("/users", userRouter);
app.use("/orders", orderRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port 5000`);
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB Atlas!");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Creating user  POST /users
// Get User       GET /users
// Update User    PATCH /users
// Get One User   GET /users/{user id}

// TO ADD

// Get my details (route)
