const USER = require("../models/USERINFO.model");
const jwt = require("jsonwebtoken");
const { admin } = require("../config/firebase");

// Middleware kiểm tra token
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const user = await decodedToken(idToken);
    req.user = user; // thông tin user đã xác minh
    next();
  } catch (error) {
    return res.status(403).send("Invalid token");
  }
};

const decodedToken = async (idToken) => {
  try {
    const user = await admin.auth().verifyIdToken(idToken);
    return user;
  } catch (error) {
    return res.status(403).send("Invalid token");
  }
};

const checkRole =
  (roles = []) =>
  async (req, res, next) => {
    const { decodeToken } = req.value.body;
    const id = decodeToken.data.id;
    const user = await USER.findById({ _id: id });
    if (user != null && user.isActived && roles.includes(user.role)) {
      next();
      return;
    }
    res.status(401).json({
      message: "Bạn không có quyền truy cập vào chức năng này",
      success: false,
    });
  };

module.exports = { decodedToken, authenticate, checkRole };
