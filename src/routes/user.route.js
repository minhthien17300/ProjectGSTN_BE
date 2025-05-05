const express = require('express')
const Controller = require('../controllers/user.controller')
const SchemaValidateUser = require("../validators/user.validator")
const router = express.Router()
const Validate = require("../validators")
const jwtServices = require("../services/jwt.service")
const verifyUserHelper = require('../helper/verifyUser.helper');
const { defaultRoles } = require('../config/defineModel');


router.post('/login', Validate.body(SchemaValidateUser.login), Controller.loginAsync)
router.post('/register', Validate.body(SchemaValidateUser.register), Controller.registerAsync)
router.post('/changePassword', jwtServices.verify, verifyUserHelper.checkRole([defaultRoles.User, defaultRoles.Admin]), Validate.body(SchemaValidateUser.changePass), Controller.changePasswordAsync)
router.get('/forgotPassword', Controller.forgotPasswordAsync)
router.post('/resetPassword', Validate.body(SchemaValidateUser.resetPassword), Controller.resetPasswordAsync)
router.get('/findUserByToken', jwtServices.verify, Controller.findUserByTokenAsync)
router.post('/changeInfo', jwtServices.verify, verifyUserHelper.checkRole([defaultRoles.User, defaultRoles.Admin]), Validate.body(SchemaValidateUser.changeInfo), Controller.changeInfoAsync)
router.get('/findUserByToken', jwtServices.verify, Controller.findUserByTokenAsync)
router.get('/getALLUser', jwtServices.verify, verifyUserHelper.checkRole([defaultRoles.Admin]), Controller.getALLUserAsync)

module.exports = router