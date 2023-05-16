const mongoose = require("mongoose");

const dbUrl =
  "mongodb+srv://test:test123@cluster0.lls5sy9.mongodb.net/book?retryWrites=true&w=majority";
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
