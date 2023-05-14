const UserModel = require("../models/user.model");
const AuthService = require("../services/auth.service");

class UserController {
  constructor() {
    this.auth_svc = new AuthService();
  }

  getAllUsers = async (req, res, next) => {
    //
    try {
      let filters = {};
      if (req.query.role && req.query.role !== "all") {
        filters = {
          role: req.query.role,
        };
      }
      let result = await UserModel.find(filters).populate("books");
      res.json({
        result: result,
        msg: "User Fetched",
        status: true,
      });
    } catch (error) {
      next(error);
    }
  };
  updateUserById = (req, res, next) => {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }

    try {
      let validation = this.auth_svc.registerValidate(data);

      if (validation) {
        next({
          status: 400,
          msg: validation,
        });
      }
      const user = UserModel.findByIdAndUpdate(req.params.id, {
        $set: data,
      })
        .populate("books")
        .then((ack) => {
          res.json({
            result: data,
            status: true,
            msg: "User Updated successfully.",
          });
        })
        .catch((err) => {
          next({
            status: 500,
            msg: err,
          });
        });
    } catch (error) {
      next({
        status: 400,
        msg: error,
      });
    }
  };
  deleteUserById = async (req, res, next) => {
    try {
      let result = await UserModel.findByIdAndDelete(req.params.id).populate(
        "books"
      );
      if (result) {
        res.json({
          result: result,
          msg: "User Deleted Successfully",
          status: true,
        });
      } else {
        next({
          status: 404,
          msg: "User not found",
        });
      }
    } catch (err) {
      next(err);
    }
  };
  getUserById = async (req, res, next) => {
    try {
      let result = await UserModel.findById(req.params.id).populate("books");
      if (result) {
        res.json({
          result: result,
          msg: "User Fetched Successfully",
          status: true,
        });
      } else {
        next({
          status: 404,
          msg: "User not found",
        });
      }
    } catch (err) {
      next(err);
    }
  };
}
module.exports = UserController;
