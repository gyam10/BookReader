const BookModel = require("../models/book.model");
const slugify = require("slugify");
const BookService = require("../services/book.service");

class BookController {
  constructor() {
    this.book_svc = new BookService();
  }
  addBook = async (req, res, next) => {
    try {
      let data = req.body;

      if (req.file) {
        data.image = req.file.filename;
      }

      // cloudinary
      // if (req.file) {
      //   photo = cloudinary.uploader.upload(req.file);
      // }

      this.book_svc.validateBook(data);

      data.slug = slugify(data.title.toLowerCase());
      // data.author = currentUser._id;
      // data.authorName = currentUser.name;

      let book = new BookModel(data);
      let ack = await book.save();
      // console.log("test", book);
      if (ack) {
        res.json({
          result: book,
          status: true,
          msg: "Book created successfully.",
        });
      } else {
        next({
          status: 500,
          msg: "Cannot add Book",
        });
      }
    } catch (error) {
      next(error);
    }
  };
  getAllBook = async (req, res, next) => {
    //
    try {
      let filter = {};
      if (req.query) {
        filter = req.query;
      }
      let result = await BookModel.find(filter).populate("createdBy");
      res.json({
        result: result,
        msg: "Book Fetched",
        status: true,
      });
    } catch (error) {
      next(error);
    }
  };
  getBookById = async (req, res, next) => {
    //
    try {
      let result = await BookModel.findById(req.params.id).populate(
        "createdBy"
      );
      res.json({
        result: result,
        msg: "Book Fetched",
        status: true,
      });
    } catch (error) {
      next(error);
    }
  };
  getBookBySlug = async (req, res, next) => {
    try {
      let result = await BookModel.findOne({ slug: req.params.slug }).populate(
        "createdBy"
      );
      res.json({
        result: result,
        msg: "Book Fetched",
        status: true,
      });
    } catch (error) {
      next(error);
    }
  };
  updateById = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }

      this.book_svc.validateBook(data);

      BookModel.findByIdAndUpdate(req.params.id, {
        $set: data,
      })
        .populate("createdBy")
        .then((response) => {
          res.json({
            result: data,
            msg: "Book updated sucessfully",
            status: true,
          });
        })
        .catch((error) => {
          next({
            status: 400,
            msg: error,
          });
        });
    } catch (error) {
      next(error);
    }
  };
  deleteById = async (req, res, next) => {
    try {
      let ack = await BookModel.findByIdAndDelete(req.params.id).populate(
        "createdBy"
      );
      if (ack) {
        res.json({
          result: ack,
          msg: "Successfully deleted",
          status: true,
        });
      } else {
        next({
          msg: "Book does not exist or already deleted.",
          status: 400,
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = BookController;
