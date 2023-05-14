const express = require("express");
const router = express.Router();
const FavController = require("../app/controllers/fav.controller");
const fav_ctrl = new FavController();

router.post("/detail", fav_ctrl.getFavDetail);

module.exports = router;
