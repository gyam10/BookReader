const express = require("express");
const app = express();
const auth_routes = require("./auth.routes");
const book_routes = require("./book.routes");
const user_routes = require("./user.routes");
const fav_routes = require("./fav.routes");

app.use("/book", book_routes);
app.use(auth_routes);
app.use("/user", user_routes);
app.use("/fav", fav_routes);

module.exports = app;
