class BookService {
  validateBook = (data) => {
    let errMsg = {};
    if (!data.title) {
      errMsg.title = "Book Title is required";
    }
    if (!data.author) {
      errMsg.author = "Book Author is required";
    }
    if (!data.category) {
      errMsg.category = "Category is required";
    }

    if (Object.keys(errMsg).length) {
      throw {
        status: 400,
        msg: errMsg,
      };
    } else {
      return null;
    }
  };
}

module.exports = BookService;
