const EVALUATE = require('../models/EVALUATE.model');
const evaluateHelper = require('../helper/evaluate.helper');

exports.addEvaluateAsync = async ( uID, body ) => {
    try {
        const { gID, score, comment } = body;
        const evaluate = await EVALUATE.findOne({
            uID: uID,
            gID: gID
        });
        if (!evaluateHelper.checkComment(comment)) {
            if (!await evaluateHelper.autoBanUserAsync(uID)) {
                return {
                    message: "Bạn đã vi phạm nguyên tắc đánh giá của ReviewGame! Nếu còn cố tình tái phạm bạn sẽ bị khóa tài khoản!",
                    success: false
                }
            } else {
                return {
                    message: "Bạn đã bị khóa tài khoản do liên tục vi phạm nguyên tắc đánh giá của ReviewGame! Nếu có bất cứ thắc mắc nào xin liên hệ email: phamduylap123456@gmail.com",
                    success: false
                }
            }
        }
        if (evaluate != null) {
            return {
                message: "Đã tồn tại đánh giá!",
                success: false
            }
        }
        var userName = await evaluateHelper.getUserNameByIdAsync(uID);
        var curDate = new Date();
        const newEvaluate = new EVALUATE({
            uID: uID,
            gID: gID,
            name: userName,
            score: score,
            comment: comment,
            dateEvaluate: curDate
        });
        await newEvaluate.save();
        await evaluateHelper.scoreCalculatorAsync(gID);
        return {
            message: "Đã thêm đánh giá!",
            success: true,
            data: newEvaluate
        }
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.editEvaluateAsync = async ( uID, body ) => {
    try {
        const { gID, score, comment } = body;
        if (!evaluateHelper.checkComment(comment)) {
            if (!await evaluateHelper.autoBanUserAsync(uID)) {
                return {
                    message: "Bạn đã vi phạm nguyên tắc đánh giá của ReviewGame! Nếu còn cố tình tái phạm bạn sẽ bị khóa tài khoản!",
                    success: false
                }
            } else {
                return {
                    message: "Bạn đã bị khóa tài khoản do liên tục vi phạm nguyên tắc đánh giá của ReviewGame! Nếu có bất cứ thắc mắc nào xin liên hệ email: phamduylap123456@gmail.com",
                    success: false
                }
            }
        }
        var curDate = new Date();
        const evaluate = await EVALUATE.findOneAndUpdate(
            { uID: uID, gID: gID },
            { score: score, comment: comment, dateEvaluate: curDate },
            { new: true }
        )
        await evaluateHelper.scoreCalculatorAsync(gID);
        return {
            message: "Đã chỉnh sửa đánh giá!",
            success: true,
            data: evaluate
        }
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.deleteEvaluateAsync = async (uID, gID) => {
    try {
        const evaluate = await EVALUATE.deleteOne({ uID: uID, gID: gID });
        await evaluateHelper.scoreCalculatorAsync(gID);
		return {
            message: "Xóa thành công!",
            success: true,
        }
    } catch (err) {
		console.log(err);
		return {
            message: "Xóa không thành công!",
            success: false
        }
	}
}

exports.getEvaluateOfGameAsync = async (gID) => {
    try {
        const evaluates = await EVALUATE.find({ gID: gID });
        return {
            message: "Danh sách đánh giá",
            success: true,
            data: evaluates
        }
    } catch (err) {
		console.log(err);
		return {
            message: "Oops! Có lỗi xảy ra!",
            success: false
        }
	}
}

exports.getUserEvaluateAsync = async (uID, gID) => {
    try {
        const evaluate = await EVALUATE.findOne({ uID: uID, gID: gID });
        if (evaluate != null) {
            return {
                message: "Lấy đánh giá thành công!",
                success: true,
                data: evaluate
            }
        } else {
            return {
                message: "Có vẻ bạn chưa đánh giá, hãy đánh giá!",
                success: false
            }
        }
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.evaluateFilterAsync = async body => {
    try {
        const { gID, scores } = body;
        const evaluates = await EVALUATE.find({
            gID: gID,
            score: { $in: scores }
        });
        if (evaluates.length > 0) {
            return {
                message: "Danh sách đánh giá",
                success: true,
                data: evaluates
            }
        } else {
            return {
                message: "Không tìm thấy đánh giá",
                success: false
            }
        }
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}
