const router = require("express").Router();
const UserController = require("../app/controllers/user.controller");
const user_ctrl = new UserController();
const loginCheck = require("../app/middleware/auth.middleware");
const uploader = require("../app/middleware/file-upload.middleware");

let setDestination = (req, res, next) => {
  req.dest = "user";
  next();
};

router.route("/").get(loginCheck, user_ctrl.getAllUsers);

router
  .route("/:id")
  .put(
    loginCheck,
    setDestination,
    uploader.single("image"),
    user_ctrl.updateUserById
  )
  .delete(user_ctrl.deleteUserById)
  .get(user_ctrl.getUserById);

module.exports = router;
