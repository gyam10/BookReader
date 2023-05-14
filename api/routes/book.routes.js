const express = require("express");
const router = express.Router();
const loginCheck = require("../app/middleware/auth.middleware");
const uploader = require("../app/middleware/file-upload.middleware");
const { isAdmin } = require("../app/middleware/rbac.middleware");
const BookController = require("../app/controllers/book.controller");
const book_ctrl = new BookController();
let setDestination = (req, res, next) => {
  req.dest = "books";
  next();
};
// http://localhost:5000/api/v1/book
router.post(
  "/addBook",
  loginCheck,
  isAdmin,
  setDestination,
  uploader.single("image"),
  book_ctrl.addBook
);
router.get("/", book_ctrl.getAllBook);
router.get("/byslug/:slug", book_ctrl.getBookBySlug);
router
  .route("/:id")
  .get(book_ctrl.getBookById)
  .put(
    loginCheck,
    isAdmin,
    setDestination,
    uploader.single("image"),
    book_ctrl.updateById
  )
  .delete(loginCheck, isAdmin, book_ctrl.deleteById);
module.exports = router;
