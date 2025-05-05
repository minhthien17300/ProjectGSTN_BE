const bucket = require("../config/firebase");
const uuid = require('uuid-v4');
const fs = require('fs');

async function uploadImage(name, folder) {
    const path = "./temp/images/" + name;
    const metadata = {
      metadata: {
        // Tạo downloadToken (không được xóa)
        firebaseStorageDownloadTokens: uuid(),
      },
      contentType: "image/png",
      cacheControl: "public, max-age=31536000",
    };
  
    const tasks = await bucket.upload(path, {
      gzip: true,
      metadata: metadata,
      destination: folder + name,
    });
  
    const urls = await tasks[0].getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });
  
    // Xóa hình trong file lưu tạm
    fs.unlinkSync(path);

    return urls[0];
  }

  module.exports = {
    uploadImage,
  };
  