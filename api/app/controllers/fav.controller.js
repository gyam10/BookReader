const BookModel = require("../models/book.model");

class FavController {
  getFavDetail = async (req, res, next) => {
    try {
      let fav = req.body;
      let book_ids = fav.map((item) => item.book_id);
      let books = await BookModel.find({
        _id: { $in: book_ids },
      });

      res.json({
        result: books,
        status: true,
        msg: "Fav fetched",
      });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = FavController;
