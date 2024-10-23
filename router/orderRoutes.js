const router = require("express").Router();

const {
  getAllOrders,
  updateOrder,
  deleteOrder,
  createOrder,
  getOrderById,
  getOrdersByUserId,
  getMyOrders,
} = require("../controllers/orderController");
const verifyToken = require("../middlewares/verifyToken");

// /orders
router.use(verifyToken);
// Get all orders
router.get("/", getAllOrders);
// Create new order
router.post("/", createOrder);
// Get currently logged in user orders
router.get("/my-orders", getMyOrders);
// Get order by order id
router.get("/:id", getOrderById);
// Get order by user id
router.get("/user/:id", getOrdersByUserId);
// Update order (for logged in user)
router.put("/:id", updateOrder);
// delete order
router.delete("/:id", deleteOrder);

module.exports = router;

// Creating order  POST /orders
// Get order       GET /orders
// Update order    PATCH /orders
// Get One order   GET /orders/{user id}
