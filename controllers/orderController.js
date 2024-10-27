const { response } = require("express");
const OrderModel = require("../models/orderModel");
const jwt = require("jsonwebtoken");

const getAllOrders = (req, res) => {
  console.log(req.user)
  if (req.user?.role !== 'admin' && req.user?.role !== "dispatch") {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  OrderModel.find()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};


const updateOrder = async (req, res) => {
  console.log("update order", req.user);
  const detailsToSave = {};
  console.log(req.body.confirmedByUser);
  if (req.body.confirmedByUser && req.user.role === "user") {
    detailsToSave.confirmedByUser = req.body.confirmedByUser;
  } else if (req.body.dispatched && req.user.role === "dispatch") {
    detailsToSave.dispatched = req.body.dispatched;
  }

  // console.log(detailsToSave);
  console.log(req.params.id);
  // return;
  OrderModel.findOneAndUpdate(
    { _id: req.params.id},
    detailsToSave,
    {
      new: true,
    }
  )
    .then((result) => {
      console.log(result);
      if (!result) {
        res.status(404).json({ message: "Order not found" });
      } else {
        res.status(200).json({
          message: "Order updated successfully",
          data: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

const getOrderById = async (req, res) => {
  OrderModel.findById(req.params._id, req.body, { new: true })
    .then((result) => {
      res.status(200).json({ message: "id already", message: result });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Failed to get order", message: err.message });
    });
};

const getMyOrders = (req, res) => {
  OrderModel.find({ user: req.user._id })
    .then((result) => {
      console.log(result);

      res.status(200).json({ data: result, message: "Orders found" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Failed to get orders", message: err.message });
    });
};
const getOrdersByUserId = async (req, res) => {
  console.log(req.params.id);
  OrderModel.find({ user: req.params.id })
    .then((result) => {
      console.log(result);
      res.status(200).json({ data: result, message: "Orders found" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Order not found" });
    });
};

const deleteOrder = async (req, res) => {
  // Check if the user deleting the order is authorized
  OrderModel.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) return res.status(404).json({ message: "Order not found" });
      res
        .status(200)
        .json({ message: "Order deleted successfully", data: result });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Failed to delete order", data: err.message });
    });
};

const createOrder = (req, res) => {
  const detailsToSave = {
    ...req.body,
    user: req.user._id,
    status: "pending",
    confirmedByUser: false,
    dispatched: false,
  };

  OrderModel.create(detailsToSave)
    .then((result) => {
      console.log("Order created successfully");
      res
        .status(201)
        .json({ message: "Order created successfully", data: result });
    })
    .catch((err) => {
      console.log("Failed to create order", err);
      res
        .status(500)
        .json({ message: "Failed to create order", data: err.message });
    });
};

module.exports = {
  getAllOrders,
  updateOrder,
  deleteOrder,
  createOrder,
  getOrderById,
  getOrdersByUserId,
  getMyOrders,
};
