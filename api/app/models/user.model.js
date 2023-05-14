const mongoose = require("mongoose");
const UserSchemaDef = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: String,
    role: [
      {
        type: String,
        enum: ["admin", "reader"],
        default: "reader",
      },
    ],
    role_id: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Role",
        default: null,
      },
    ],
    books: {
      type: mongoose.Types.ObjectId,
      ref: "Book",
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const UserModel = mongoose.model("User", UserSchemaDef);
module.exports = UserModel;
