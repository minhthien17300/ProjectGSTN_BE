const { uploadImage } = require('../services/uploadFirebase.service');

exports.uploadImageAsync = async (images, name) => {
	try {
        const folderName = name + " Images/";
        var urlImages = [];
        for (let i = 0; i < images.length; i++) {
          var addImage = images[i];
          const urlImage = await uploadImage(addImage.filename, folderName);
          urlImages.push(urlImage);
        }
		return urlImages;
	} catch (e) {
		console.log(e);
		return null;
	}
};