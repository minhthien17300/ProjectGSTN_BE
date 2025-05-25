const jwt = require("jsonwebtoken");
const { configEnv } = require("../config/config");

const verify = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    res.status(403).json({
      data: {
        tokenVerificationData: { access: false, message: "No token provided" },
      },
    });
    return;
  }
  const token = header.split(" ")[1];
  jwt.verify(token, configEnv.ACCESS_TOKEN_SECRET, (err, decodedFromToken) => {
    if (err) {
      res.status(403).json({
        data: {
          tokenVerificationData: {
            access: false,
            message: "Failed to verify token",
          },
        },
      });
      return;
    } else {
      console.log(req.body);
      req.value = { body: { decodeToken: decodedFromToken, token } };
      next();
    }
  });
};
const createToken = (data) => {
  return jwt.sign(
    {
      iss: "GSTN",
      data: data,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    configEnv.ACCESS_TOKEN_SECRET
  );
};

const createBookToken = (id) => {
  return jwt.sign(
    {
      iss: "GSTN",
      data: id,
    },
    configEnv.ACCESS_TOKEN_SECRET
  );
};

const verifyBookToken = (token, userId) => {
  jwt.verify(token, configEnv.ACCESS_TOKEN_SECRET, (err, decodedFromToken) => {
    if (err) {
      return {
        message: "Sai mã sách!",
        success: false,
      };
    } else {
      const id = decodedFromToken.data;
      return {
        message: "Chúc bạn học tập vui vẻ",
        success: false,
        data: id,
      };
    }
  });
};

module.exports = {
  verify,
  createToken,
  createBookToken,
  verifyBookToken,
};
