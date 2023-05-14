const mongoose = require("mongoose");
const BookSchemaDef = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);
const BookModel = mongoose.model("Book", BookSchemaDef);
module.exports = BookModel;
