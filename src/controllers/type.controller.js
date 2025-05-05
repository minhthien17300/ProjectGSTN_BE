const typeServices = require('../services/type.service');
const controller = require('./message.controller');

exports.getALLTypeAsync = async (req, res, next) => {
    try {
        const resServices = await typeServices.getALLTypeAsync();
        if (resServices.length == 0) {
			return controller.sendSuccess(res, {}, 400, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices,
			200,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}