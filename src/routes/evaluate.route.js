const express = require('express')
const Controller = require('../controllers/evaluate.controller')
const SchemaValidateEvaluate = require("../validators/evaluate.validator")
const router = express.Router()
const Validate = require("../validators")
const jwtServices = require("../services/jwt.service")
const verifyUserHelper = require('../helper/verifyUser.helper');
const { defaultRoles } = require('../config/defineModel');

router.post('/addEvaluate', jwtServices.verify, verifyUserHelper.checkRole([defaultRoles.Admin, defaultRoles.User]), Validate.body(SchemaValidateEvaluate.addEvaluate), Controller.addEvaluateAsync)
router.post('/editEvaluate', jwtServices.verify, verifyUserHelper.checkRole([defaultRoles.Admin, defaultRoles.User]), Validate.body(SchemaValidateEvaluate.editEvaluate), Controller.editEvaluateAsync)
router.post('/deleteEvaluate', jwtServices.verify, verifyUserHelper.checkRole([defaultRoles.Admin, defaultRoles.User]), Controller.deleteEvaluateAsync)
router.get('/getEvaluateOfGame', Controller.getEvaluateOfGameAsync)
router.get('/getUserEvaluate', jwtServices.verify, verifyUserHelper.checkRole([defaultRoles.Admin, defaultRoles.User]), Controller.getUserEvaluateAsync)
router.get('/evaluateFilter', Validate.body(SchemaValidateEvaluate.evaluateFilter), Controller.evaluateFilterAsync)



module.exports = router