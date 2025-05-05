const TYPE = require('../models/TYPE.model');

exports.getALLTypeAsync = async () => {
    try {
        const type = await TYPE.find();
        return type;
    } catch (err) {
		console.log(err);
		return null;
	}
}