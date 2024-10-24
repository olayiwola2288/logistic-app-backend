const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const verifyToken = (req, res, next) => {
  //   console.log(req.body);
  const token = req.headers.token;
  if (!token) return res.status(403).json({ message: "No token provided" });

  const decodedToken = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY
  );
  // console.log(decodedToken);

  if (!decodedToken) {
    return res.status(401).json({ message: "Invalid token" });
  } else {
    // req.userId = decodedToken.userId

    UserModel.findById(decodedToken.userId)
      .then((result) => {
        console.log("line 21", result);
        if(!result) {
          return res.status(404).json({ message: "THe user belonging to this token no longer exist"})
        } 
        req.user = result;
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ message: "User not found" });
      });
    // const user = {}
    // user.name ="Ade"
  }
};

module.exports = verifyToken;
