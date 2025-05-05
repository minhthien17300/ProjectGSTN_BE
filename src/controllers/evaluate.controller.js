const evaluateServices = require('../services/evaluate.service');
const controller = require('../controllers/message.controller');
const jwtServices = require('../services/jwt.service');

exports.addEvaluateAsync = async (req, res, next) => {
    try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
        const resServices = await evaluateServices.addEvaluateAsync(id, req.value.body);
        if (!resServices.success) {
			return controller.sendSuccess(res, {}, 400, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			201,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.editEvaluateAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
        const resServices = await evaluateServices.editEvaluateAsync(id, req.value.body);
        if (!resServices.success) {
			return controller.sendSuccess(res, {}, 400, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.deleteEvaluateAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
        const resServices = await evaluateServices.deleteEvaluateAsync(id, req.body.gID);
        if (!resServices.success) {
			return controller.sendSuccess(res, {}, 400, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.getEvaluateOfGameAsync = async (req, res, next) => {
	try {
        const resServices = await evaluateServices.getEvaluateOfGameAsync(req.query.gID);
        if (!resServices.success) {
			return controller.sendSuccess(res, {}, 404, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.getUserEvaluateAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
        const resServices = await evaluateServices.getUserEvaluateAsync(id, req.query.gID);
        if (!resServices.success) {
			return controller.sendSuccess(res, {}, 404, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.evaluateFilterAsync = async (req, res, next) => {
	try {
		let body = {
			gID: req.query.gID,
			scores: req.query.scores,
		};
        const resServices = await evaluateServices.evaluateFilterAsync(body);
        if (!resServices.success) {
			return controller.sendSuccess(res, {}, 404, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}