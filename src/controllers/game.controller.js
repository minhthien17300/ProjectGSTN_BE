const gameServices = require('../services/game.service');
const controller = require('./message.controller');

exports.addGameAsync = async (req, res, next) => {
    try {
        const resServices = await gameServices.addGameAsync(req.value.body, req.files["images"]);
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

exports.editGameAsync = async (req, res, next) => {
	try {
		const resServices = await gameServices.editGameAsync(req.value.body, req.files["images"]);
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

exports.deleteGameAsync = async (req, res, next) => {
	try {
		const resServices = await gameServices.deleteGameAsync(req.body.id);
		if (!resServices.success) {
			return controller.sendSuccess(res, {}, 500, resServices.message);
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

exports.findGameByTypeAsync = async (req, res, next) =>{
    try {
        const resServices = await gameServices.findGameByTypeAsync(req.query.types);
        if(!resServices.success) {
            return controller.sendSuccess(res, {}, 404, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			302,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.getALLGameAsync = async (req, res, next) =>{
    try {
        const resServices = await gameServices.getALLGameAsync();
        if(resServices == null) {
            return controller.sendSuccess(res, {}, 404, "Oops! Có lỗi xảy ra!");
		}
		return controller.sendSuccess(
			res,
			resServices,
			302
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.getGameDetailAsync = async (req, res, next) => {
	try {
        const resServices = await gameServices.getGameDetailAsync(req.query.id);
        if(resServices == null) {
            return controller.sendSuccess(res, {}, 404, "Oops! Có lỗi xảy ra!");
		}
		return controller.sendSuccess(
			res,
			resServices,
			302
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.findGameByNameAsync = async (req, res, next) => {
	try {
        const resServices = await gameServices.findGameByNameAsync(req.query.name);
        if(!resServices.success) {
            return controller.sendSuccess(res, {}, 404, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			302,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.getGameSortAsync = async (req, res, next) =>{
    try {
        const resServices = await gameServices.getGameSortAsync();
        if(resServices == null) {
            return controller.sendSuccess(res, {}, 404, "Oops! Có lỗi xảy ra!");
		}
		return controller.sendSuccess(
			res,
			resServices,
			302
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}
