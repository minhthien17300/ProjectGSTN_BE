const joi = require("@hapi/joi");
const schemas = {
  register: joi.object().keys({
    userName: joi.string().required(),
    userPwd: joi.string().required(),
    confirmPassword: joi.string().required(),
    name: joi.string().required(),
    address: joi.string().allow("").optional(),
    email: joi.string().email().required(),
    phone: joi
      .string()
      .pattern(/^[0-9]+$/)
      .required(),
    dateofBirth: joi.date(),
  }),
  login: joi.object().keys({
    userName: joi.string().allow("").optional(),
    userPwd: joi.string().allow("").optional(),
    provider: joi.string().required(),
    idToken: joi.string().allow("").optional(),
  }),
  changePass: joi.object().keys({
    oldPassword: joi.string().required(),
    newPassword: joi.string().required(),
    confirmPassword: joi.string().required(),
  }),
  resetPassword: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
    otp: joi.string().required(),
  }),
  changeInfo: joi.object().keys({
    name: joi.string().required(),
    //email: joi.string().email().required(),
    phone: joi
      .string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    gender: joi.number(),
    dateofBirth: joi.date(),
  }),
};
module.exports = schemas;
