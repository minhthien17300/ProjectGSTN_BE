const express = require("express");
const userRoute = require("./user.route");
const bookRoute = require("./book.route");
const evaluateRoute = require("./evaluate.route");
const typeRoute = require("./type.route");

const router = express.Router();
router.use("/user", userRoute);
router.use("/book", bookRoute);
router.use("/evaluate", evaluateRoute);
router.use("/type", typeRoute);

router.get("/healCheck", (req, res) =>
  res.status(200).send("Chào mừng đến với Gia sư tài năng")
);

module.exports = router;
