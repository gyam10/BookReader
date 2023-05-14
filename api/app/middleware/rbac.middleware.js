const isAdmin = (req, res, next) => {
  let role = req.auth_user.role;
  if (role.includes("admin")) {
    next();
  } else {
    next({
      status: 403,
      msg: "Unauthorized",
    });
  }
};

const isReader = (req, res, next) => {
  let role = req.auth_user.role;
  if (role.includes("reader")) {
    next();
  } else {
    next({
      status: 403,
      msg: "Unauthorized",
    });
  }
};

module.exports = {
  isAdmin,
  isReader,
};
