const joi = require('@hapi/joi');
const schemas = {
	addEvaluate: joi.object().keys({
		gID: joi.string().required(),
		score: joi.number(),
        comment: joi.string().required()
	}),
	editEvaluate: joi.object().keys({
		gID: joi.string().required(),
		score: joi.number(),
        comment: joi.string().required()
	}),
	evaluateFilter: joi.object().keys({
		gID: joi.string().required(),
		scores: joi.array().required()
	}),
};
module.exports = schemas;