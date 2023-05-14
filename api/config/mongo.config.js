const mongoose = require("mongoose");
// const dbUrl = "mongodb://127.0.0.1:27017/book";
const dbUrl = process.env.MONGODB_URL;
mongoose.connect(
  dbUrl,
  {
    autoCreate: true,
    autoIndex: true,
  },
  (err) => {
    if (err) {
      console.error("Mongo connection error: " + err);
    } else {
      console.log("Db Connected successfully.");
    }
  }
);
// mongoose.set("strictQuery", false);
