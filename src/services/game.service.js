const GAME = require("../models/GAMEINFO.model");
const { string, array } = require('@hapi/joi');
const { $where } = require("../models/GAMEINFO.model");
const { query } = require("express");
const uploadImageHelper = require('../helper/uploadImage.helper');

exports.addGameAsync = async (body, images) => {
    try {
        const { name, publisher, description, types } = body;
        const gameExist = await GAME.findOne({ 
            name: name 
        });
        if(gameExist) {
            return {
                message: "Game đã tồn tại!",
                success: false
            };
        };

        const urlList = await uploadImageHelper.uploadImageAsync(images, name);

        const newGame = new GAME({
            name: name,
            publisher: publisher,
            description: description,
            types: types,
            images: urlList
        });
        await newGame.save();
        return {
            message: "Tạo thành công!",
            success: true,
            data: newGame
        }
    } catch (err) {
		console.log(err);
		return null;
	}
};

exports.editGameAsync = async ( body, images ) => {
    try {
        const { id, name, publisher, description, types } = body;
        const urlList = await uploadImageHelper.uploadImageAsync(images, name);
        /* const tempGame = await GAME.findById({ _id: id });
        let tempUrls = tempGame.images;
        let urls = tempUrls.concat(urlList); */
        const game = await GAME.findOneAndUpdate(
			{ _id: id },
			{ 
				name: name,
                publisher: publisher,
				description: description,
				types: types,
                images: urlList
			},
			{ new: true }
		);
		if (game != null) {
			return {
			message: 'Đổi thông tin thành công!',
			success: true,
            data: game
			};
		}
		else {
			return {
				message: "Đổi thông tin không thành công!",
				success: false
			};
		};
    } catch (err) {
		console.log(err);
		return null;
	}
}

exports.deleteGameAsync = async (id) => {
    try {
        const game = await GAME.findOneAndUpdate(
			{ _id: id },
			{ isDeleted: true },
			{ new: true }
		);
		if (game != null) {
			return {
			message: 'Xóa thành công!',
			success: true
			};
		}
		else {
			return {
				message: "Xóa không thành công!",
				success: false
			};
		};
    } catch (err) {
		console.log(err);
		return {
            message: "Xóa không thành công!",
            success: false
        }
	}
}

exports.findGameByTypeAsync = async types => {
    try {
        const games = await GAME.find({
            types: { $in: types }
        });
        if(games.length != 0) {
            return {
            message: "Danh sách game!",
            success: true,
            data: games
            }
        } else {
            return {
                message: "Không tìm thấy game!",
                success: false
            }
        }
    } catch (err) {
		console.log(err);
		return null;
	}
};

exports.getALLGameAsync = async () => {
    try {
        const games = await GAME.find({isDeleted: false});
        return games;
    } catch (err) {
		console.log(err);
		return null;
	}
};

exports.getGameDetailAsync = async (id) => {
    try {
        const game = await GAME.findById({ _id: id });
        return game;
    } catch (err) {
		console.log(err);
		return null;
	}
}

exports.findGameByNameAsync = async name => {
    try {
        var nameRegex = new RegExp(name)
        const games = await GAME.find({name :{$regex: nameRegex, $options: 'i'}, isDeleted: false});
        if(games.length == 0) {
            return {
                message: "Không tìm thấy Game!",
                success: false
            }
        } else {
            return {
                message: "Danh sách Game",
                success: true,
                data: games
            }
        }
    } catch (err) {
		console.log(err);
		return null;
	}
}

exports.getGameSortAsync = async () => {
    try {
        const games = await GAME.find({isDeleted: false}).sort({score: -1});
        return games;
    } catch (err) {
		console.log(err);
		return null;
	}
};