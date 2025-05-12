const joi = require("@hapi/joi");
const schemas = {
  addBook: joi.object().keys({
    author: joi.string().required(),
    category: joi.string().required(),
    description: joi.string().required(),
    grade: joi.number().required(),
    name: joi.string().required(),
    page: joi.number().required(),
    price: joi.number().required(),
  }),
  editBook: joi.object().keys({
    id: joi.string().required(),
    author: joi.string().required(),
    category: joi.string().required(),
    description: joi.string().required(),
    grade: joi.number().required(),
    name: joi.string().required(),
    page: joi.number().required(),
    price: joi.number().required(),
  }),
};
module.exports = schemas;
