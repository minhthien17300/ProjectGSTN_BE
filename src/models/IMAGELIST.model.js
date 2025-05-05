const mongoose = require('mongoose');
const { defaultModel } = require('../config/defineModel');

// Image Schema
const ImageSchema = mongoose.Schema({
  name: defaultModel.stringR,
  url: defaultModel.stringImage
});

const Image = module.exports = mongoose.model('IMAGELIST', ImageSchema, 'IMAGELIST');