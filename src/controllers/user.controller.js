const userServices = require("../services/user.service");
const { configEnv } = require("../config/config");
const nodemailer = require("nodemailer");
const controller = require("./message.controller");

const processSendMail = async (resServices, res) => {
  var smtpTransport = await nodemailer.createTransport({
    service: "gmail", //smtp.gmail.com  //in place of service use host...
    secure: false, //true
    port: 25, //465
    auth: {
      user: configEnv.EMAIL,
      pass: configEnv.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    to: resServices.email,
    from: configEnv.EMAIL,
    subject: "Đăng ký tài khoản Gia sư tài năng thành công!",
    text: "Chân thành cảm ơn bạn đã sử dụng trang Web, chúc bạn học tốt!",
  };
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      return controller.sendSuccess(
        res,
        resServices.data,
        400,
        resServices.message
      );
    } else {
      controller.sendSuccess(res, resServices.data, 201, resServices.message);
    }
  });
};

exports.registerAsync = async (req, res, next) => {
  try {
    const resServices = await userServices.registerUserAsync(req.value.body);
    await processSendMail(resServices, res);
  } catch (err) {
    console.log(err);
    return controller.sendError(res);
  }
};

exports.loginAsync = async (req, res, next) => {
  try {
    const resServices = await userServices.loginAsync(req.value.body);
    if (!resServices.success) {
      return controller.sendSuccess(res, {}, 400, resServices.message);
    }
    if (resServices.isCreateAccount) {
      await processSendMail(resServices, res);
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
};

exports.forgotPasswordAsync = async (req, res, next) => {
  try {
    const { email } = req.query;
    const resServices = await userServices.fotgotPasswordAsync({
      email: email,
    });
    if (!resServices.success) {
      return controller.sendSuccess(
        res,
        resServices.success,
        400,
        resServices.message
      );
    }
    return controller.sendSuccess(
      res,
      resServices.data,
      200,
      resServices.message
    );
  } catch (error) {
    console.log(error);
    return controller.sendError(res);
  }
};
exports.resetPasswordAsync = async (req, res, next) => {
  try {
    const resServices = await userServices.resetPasswordAsync(req.value.body);
    if (!resServices.success) {
      return controller.sendSuccess(
        res,
        resServices.success,
        400,
        resServices.message
      );
    }

    return controller.sendSuccess(
      res,
      resServices.data,
      200,
      resServices.message
    );
  } catch (error) {
    console.log(error);
    return controller.sendError(res);
  }
};

exports.findUserByTokenAsync = async (req, res, next) => {
  try {
    const { decodeToken } = req.value.body;
    const id = decodeToken.data.id;
    const resServices = await userServices.findUserByIdAsync(id);
    return controller.sendSuccess(
      res,
      resServices.data,
      302,
      resServices.message
    );
  } catch (error) {
    // bug
    console.log(error);
    return controller.sendError(res);
  }
};

exports.changePasswordAsync = async (req, res, next) => {
  try {
    const { decodeToken } = req.value.body;
    const id = decodeToken.data.id;
    const resServices = await userServices.changePasswordAsync(
      id,
      req.value.body
    );
    if (!resServices.success) {
      return controller.sendSuccess(
        res,
        resServices.data,
        400,
        resServices.message
      );
    }
    return controller.sendSuccess(
      res,
      resServices.data,
      200,
      resServices.message
    );
  } catch (error) {
    return controller.sendError(res);
  }
};

exports.changeInfoAsync = async (req, res, next) => {
  try {
    const { decodeToken } = req.value.body;
    const id = decodeToken.data.id;
    const resServices = await userServices.changeInfoAsync(id, req.value.body);
    if (!resServices.success) {
      return controller.sendSuccess(
        res,
        resServices.data,
        400,
        resServices.message
      );
    }
    return controller.sendSuccess(
      res,
      resServices.data,
      200,
      resServices.message
    );
  } catch (error) {
    return controller.sendError(res);
  }
};

exports.banUserAsync = async (req, res, next) => {
  try {
    const id = req.body.id;
    const resServices = await userServices.banUserAsync(id);
    if (!resServices.success) {
      return controller.sendSuccess(
        res,
        resServices.success,
        418,
        resServices.message
      );
    }
    return controller.sendSuccess(
      res,
      resServices.success,
      200,
      resServices.message
    );
  } catch (error) {
    return controller.sendError(res);
  }
};

exports.unbanUserAsync = async (req, res, next) => {
  try {
    const id = req.body.id;
    const resServices = await userServices.unbanUserAsync(id);
    if (!resServices.success) {
      return controller.sendSuccess(
        res,
        resServices.success,
        418,
        resServices.message
      );
    }
    return controller.sendSuccess(
      res,
      resServices.success,
      200,
      resServices.message
    );
  } catch (error) {
    return controller.sendError(res);
  }
};

exports.getALLUserAsync = async (req, res, next) => {
  try {
    const resServices = await userServices.getALLUserAsync();
    if (!resServices.success) {
      return controller.sendSuccess(
        res,
        resServices.data,
        400,
        resServices.message
      );
    } else {
      return controller.sendSuccess(
        res,
        resServices.data,
        302,
        resServices.message
      );
    }
  } catch (error) {
    // bug
    console.log(error);
    return controller.sendError(res);
  }
};
