const router = require("express").Router();
const AuthController = require("../app/controllers/auth.controller");
const auth_ctrl = new AuthController();
const loginCheck = require("../app/middleware/auth.middleware");
const uploader = require("../app/middleware/file-upload.middleware");

let setDestination = (req, res, next) => {
  req.dest = "user";
  next();
};
// http://localhost:5000/api/v1/register
router.post(
  "/register",
  setDestination,
  uploader.single("image"),
  auth_ctrl.registerUser
);
router.post("/login", auth_ctrl.loginUser);

router.get("/login-verify", loginCheck, auth_ctrl.verifyUser);
module.exports = router;
