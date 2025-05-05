const mongoose = require('mongoose');
const { defaultModel } = require('../config/defineModel');

// Evaluate Schema
const EvaluateSchema = mongoose.Schema({
  uID: defaultModel.stringR,
  gID: defaultModel.stringR,
  name: defaultModel.stringR,
  score: defaultModel.number,
  comment: defaultModel.stringR,
  dateEvaluate: defaultModel.date
});

const Evaluate = module.exports = mongoose.model('EVALUATE', EvaluateSchema, 'EVALUATE');