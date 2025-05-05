const express = require('express')
const Controller = require('../controllers/game.controller')
const SchemaValidateGame = require("../validators/game.validator")
const router = express.Router()
const Validate = require("../validators")
const jwtServices = require("../services/jwt.service")
const verifyUserHelper = require('../helper/verifyUser.helper');
const { defaultRoles } = require('../config/defineModel');
const path = require("path");
var multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "temp/images/");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + Math.floor(Math.random() * 100) + path.extname(file.originalname));
    },
  });
const upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'images', maxCount: 100 }]);

router.post('/addGame', jwtServices.verify, verifyUserHelper.checkRole([defaultRoles.Admin]), cpUpload, Validate.body(SchemaValidateGame.addGame), Controller.addGameAsync)
router.post('/editGame', jwtServices.verify, verifyUserHelper.checkRole([defaultRoles.Admin]), cpUpload, Validate.body(SchemaValidateGame.editGame), Controller.editGameAsync)
router.post('/deleteGame', jwtServices.verify, verifyUserHelper.checkRole([defaultRoles.Admin]), Controller.deleteGameAsync)
router.get('/findGameByType', Controller.findGameByTypeAsync)
router.get('/getALLGame', Controller.getALLGameAsync)
router.get('/getGameDetail', Controller.getGameDetailAsync)
router.get('/findGameByName', Controller.findGameByNameAsync)
router.get('/getGameSort', Controller.getGameSortAsync)


module.exports = router