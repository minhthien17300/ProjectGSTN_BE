const mongoose = require('mongoose');
const { defaultModel } = require('../config/defineModel')

// User Schema
const UserSchema = mongoose.Schema({
  userName: defaultModel.stringUnique,
  userPwd: defaultModel.stringR,
  name: defaultModel.stringR,
  email: defaultModel.stringUnique,
  phone: defaultModel.stringPhone,
  gender: defaultModel.number,
  dateofBirth: defaultModel.date,
  role: defaultModel.number,
  otp: defaultModel.string,
  isWarned: defaultModel.number,
  isActived: defaultModel.boolean
});

const User = module.exports = mongoose.model('USERINFO', UserSchema, 'USERINFO');