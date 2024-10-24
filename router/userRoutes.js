const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  signInUser,
  signUpUser,
  getUsers,
  getUserById,
  updateUser,
  getMe
} = require("../controllers/userController");

router.post("/signin", signInUser);
router.post("/signup", signUpUser);

router.use(verifyToken);
router.get("/me", getMe)
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

module.exports = router;
