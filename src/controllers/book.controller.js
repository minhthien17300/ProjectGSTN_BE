const bookServices = require("../services/book.service");
const controller = require("./message.controller");

exports.addBookAsync = async (req, res, next) => {
  try {
    const resServices = await bookServices.addBookAsync(req.value.body);
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
};

exports.editBookAsync = async (req, res, next) => {
  try {
    const resServices = await bookServices.editBookAsync(req.value.body);
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
};

exports.deleteBookAsync = async (req, res, next) => {
  try {
    const resServices = await bookServices.deleteBookAsync(req.body.id);
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
};

exports.getALLBookAsync = async (req, res, next) => {
  try {
    const resServices = await bookServices.getALLBookAsync();
    if (resServices == null) {
      return controller.sendSuccess(res, {}, 404, "Oops! Có lỗi xảy ra!");
    }
    return controller.sendSuccess(res, resServices, 302);
  } catch (err) {
    console.log(err);
    return controller.sendError(res);
  }
};

exports.getBookDetailAsync = async (req, res, next) => {
  try {
    const resServices = await bookServices.getBookDetailAsync(req.query.id);
    if (resServices == null) {
      return controller.sendSuccess(res, {}, 404, "Oops! Có lỗi xảy ra!");
    }
    return controller.sendSuccess(res, resServices, 302);
  } catch (err) {
    console.log(err);
    return controller.sendError(res);
  }
};

exports.fetchPageAsync = async (req, res, next) => {
  try {
    const resServices = await bookServices.fetchPage(
      req.body.category,
      req.body.lastVisibleDoc == "" ? undefined : req.body.lastVisibleDoc,
      req.body.pageSize == "" ? undefined : req.body.pageSize
    );
    if (!resServices.success) {
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
};

exports.confirmBuyBookAsync = async (req, res, next) => {
  try {
    const resServices = await bookServices.confirmBuyBookAsync(req.value.body);
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
};

exports.addBookToLibraryAsync = async (req, res, next) => {
  try {
    const { decodeToken } = req.value.body;
    const id = decodeToken.data.id;
    const resServices = await bookServices.addBookToLibraryAsync(
      id,
      req.value.body.bookId
    );
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
};
