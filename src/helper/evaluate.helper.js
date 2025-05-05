const EVALUATE = require('../models/EVALUATE.model');
const GAME = require('../models/GAMEINFO.model');
const USER = require('../models/USERINFO.model');
const {DontSayTheseWords} = require('../config/config');
const {defaultGameStatus} = require('../config/defineModel');

exports.checkComment = (comment) => {
    var cmt = new String(comment).toLowerCase();
    for (var word of DontSayTheseWords) {
        if (cmt.indexOf(word) != -1) return false;
    }
    return true;
}

exports.scoreCalculatorAsync = async (gID) => {
    try {
        var score = 0;
        var review = "Unknown";
        var avgScore = 0;
        const evaluates = await EVALUATE.find({ gID: gID });
        if (evaluates.length > 0) {
            for (var evaluate of evaluates) {
                score = score + evaluate.score;
            }
            avgScore = score/evaluates.length;
            if (avgScore <= 2) {
                review = defaultGameStatus.VeryNegative;
            }
            else if (avgScore <=4) {
                review = defaultGameStatus.Negative;
            }
            else if (avgScore <=6) {
                review = defaultGameStatus.Mixed;
            }
            else if (avgScore <=8) {
                review = defaultGameStatus.Positive;
            }
            else {
                review = defaultGameStatus.VeryPositive;
            }
        }
        await GAME.findOneAndUpdate(
                { _id: gID},
                { score: avgScore, review: review },
                { new: true }
            );
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.autoBanUserAsync = async (uID) => {
    try {
        const user = await USER.findById({ _id: uID });
        if (user.isWarned < 3) {
            user.isWarned = user.isWarned + 1;
            await user.save();
            return false;
        } else {
            user.isActived = false;
            await user.save();
            return true;
        }
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.getUserNameByIdAsync = async (uID) => {
    try {
        const user = await USER.findById({ _id: uID });
        return user.name;
    } catch (err) {
		console.log(err);
		return "";
	}
}