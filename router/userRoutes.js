const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  signInUser,
  signUpUser,
  getUsers,
  getUserById,
  updateUser,
} = require("../controllers/userController");

router.post("/signin", signInUser);
router.post("/signup", signUpUser);

router.use(verifyToken);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

module.exports = router;
