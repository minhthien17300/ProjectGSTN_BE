const express = require("express");
const Controller = require("../controllers/book.controller");
const SchemaValidateGame = require("../validators/book.validator");
const router = express.Router();
const Validate = require("../validators");
const jwtServices = require("../services/jwt.service");
const verifyUserHelper = require("../helper/verifyUser.helper");
const { defaultRoles } = require("../config/defineModel");
const path = require("path");
var multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "temp/images/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        Math.floor(Math.random() * 100) +
        path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: "images", maxCount: 100 }]);

router.post(
  "/addBook",
  jwtServices.verify,
  verifyUserHelper.checkRole([defaultRoles.Admin]),
  cpUpload,
  Validate.body(SchemaValidateGame.addBook),
  Controller.addBookAsync
);
router.post(
  "/editBook",
  jwtServices.verify,
  verifyUserHelper.checkRole([defaultRoles.Admin]),
  cpUpload,
  Validate.body(SchemaValidateGame.editBook),
  Controller.editBookAsync
);
router.post(
  "/deleteBook",
  jwtServices.verify,
  verifyUserHelper.checkRole([defaultRoles.Admin]),
  Controller.deleteBookAsync
);
router.get("/getALLBook", Controller.getALLBookAsync);
router.get("/getBookDetail", Controller.getBookDetailAsync);
router.post("/fetchPage", Controller.fetchPageAsync);
router.post("/confirmBuyBook", Controller.confirmBuyBookAsync);
router.post(
  "/addBookToLibrary",
  jwtServices.verify,
  Controller.addBookToLibraryAsync
);

module.exports = router;
