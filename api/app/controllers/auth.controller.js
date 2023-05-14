const UserModel = require("../models/user.model");
const AuthService = require("../services/auth.service");
const bcrypt = require("bcrypt");
class AuthController {
  constructor() {
    this.auth_svc = new AuthService();
  }

  loginUser = async (req, res, next) => {
    try {
      let data = req.body;
      console.log("here");
      console.log(data || "here");
      let result = this.auth_svc.loginValidate(data);
      let user = await UserModel.findOne({
        email: data.email,
      });
      if (user) {
        if (bcrypt.compareSync(data.password, user.password)) {
          let access_token = this.auth_svc.generateAccessToken({
            id: user._id,
            name: user.name,
            role: user.role,
          });

          res.json({
            result: {
              user: user,
              access_token: access_token,
            },
            status: true,
            msg: "Login successful",
          });
        } else {
          throw "Credentials does not match";
        }
      } else {
        throw "User does not exists";
      }
    } catch (error) {
      // error
      console.log("LoginException: ", error);
      next({
        status: 400,
        msg: error,
      });
    }
  };
  registerUser = async (req, res, next) => {
    let data = req.body;
    // console.log("test", data);
    // console.log("here");
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
      } else {
        // passwrod encrypt
        let hash = bcrypt.hashSync(data.password, 10);
        data.password = hash;
      }

      if (data.role) {
        data.role = data.role.split(",");
      }

      let user = new UserModel(data);
      user
        .save()
        .then((ack) => {
          res.json({
            result: user,
            status: true,
            msg: "User Registered successfully.",
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
  verifyUser = (req, res, next) => {
    if (req.auth_user) {
      res.json({ result: req.auth_user, status: true, msg: "Verified" });
    } else {
      next({
        status: 403,
        msg: "Unauthorized",
      });
    }
  };
}

module.exports = AuthController;
