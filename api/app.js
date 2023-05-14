const express = require("express");
const app = express();
require("./config/mongo.config");
const cors = require("cors");
const routes = require("./routes/route");
const myEvent = require("./app/events/events");
// const fileUpload = require("express-fileupload");

app.use((req, res, next) => {
  req.myEvent = myEvent;
  next();
});

// file upload
// app.use(fileUpload({ useTempFiles: true }));

// Cors call
app.use(cors());

app.use(express.json());

// app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/assets", express.static(process.cwd() + "/uploads"));
app.use("/public", express.static(process.cwd() + "/public"));

// http://localhost:5000/api/v1/
app.use("/api/v1/", routes);
//app.use(routes)

app.use((req, res, next) => {
  next({
    status: 404,
    msg: "Not found",
  });
});
// error page handling
app.use((error, req, res, next) => {
  console.log("Err: ", error);
  let status = error.status || 500;
  let msg = error.msg || "Server Errror";

  res.status(status).json({
    result: null,
    msg: msg,
    status: false,
  });
});
// For local Host
// app.listen(5000, "localhost", (err) => {
//   if (err) {
//     console.error("APP: ", err);
//     console.log("Error listening to port 5000//");
//   } else {
//     console.log("Server is listening to port 5000//");
//     console.log("Press CTRL+C to end server");
//   }
// });

app.listen(process.env.PORT || 80);
