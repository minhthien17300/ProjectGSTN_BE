const mongoose = require('mongoose');
const { defaultGameStatus, defaultModel } = require('../config/defineModel');

// Type Schema
const TypeSchema = mongoose.Schema({
  typeName: defaultModel.stringR
});

const Type = module.exports = mongoose.model('TYPE', TypeSchema, 'TYPE');