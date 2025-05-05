const USER = require("../models/USERINFO.model");
const bcrypt = require("bcryptjs");
const jwtServices = require("./jwt.service");
const { defaultRoles } = require("../config/defineModel");
const { configEnv } = require("../config/config");
const nodemailer = require("nodemailer");
const { sendMail } = require("./sendMail.service");
const otpGenerator = require("otp-generator");
const { decodedToken } = require("../helper/verifyUser.helper");
const { db } = require("../config/firebase");

const registerUserAsync = async (body) => {
  try {
    const {
      userName,
      userPwd,
      confirmPassword,
      name,
      email,
      phone,
      gender,
      dateofBirth,
    } = body;
    //kiểm tra xem đã có email trong database chưa
    const emailExist = await USER.findOne({
      email: email,
    });
    if (emailExist)
      return {
        message: "Email đã tồn tại! Hãy đăng nhập!",
        success: false,
      };
    //kiểm tra xem đã có username trong database chưa
    const userExist = await USER.findOne({
      userName: userName,
    });
    if (userExist)
      return {
        message: "Tài khoản đã tồn tại! Hãy đăng nhập!",
        success: false,
      };

    if (userPwd != confirmPassword) {
      return {
        message: "Nhập lại mật khẩu không khớp!",
        success: false,
      };
    }
    //mã hóa password
    const hashedPassword = await bcrypt.hash(userPwd, 8);
    //lưu user
    const newUser = new USER({
      userName: userName,
      userPwd: hashedPassword,
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      dateofBirth: dateofBirth,
    });
    await newUser.save();
    return {
      message: "Đăng ký thành công",
      success: true,
      email: email,
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Internal Server Error",
      success: false,
    };
  }
};

const loginAsync = async (body) => {
  const userRef = db.collection("USER");
  try {
    const { userName, userPwd, provider, idToken } = body;

    if (provider === "account") {
      const [userNameSnap, phoneSnap] = await Promise.all([
        userRef.where("userName", "==", userName).get(),
        userRef.where("phone", "==", userName).get(),
      ]);

      const users = new Map();

      // Gộp kết quả (tránh trùng ID)
      statusSnap.forEach((doc) => users.set(doc.id, doc.data()));
      roleSnap.forEach((doc) => users.set(doc.id, doc.data()));

      // Convert Map to array
      const result = Array.from(users.values());
      const user = result[0];

      if (!user) {
        return {
          message: "Sai tài khoản hoặc số điện thoại!",
          success: false,
        };
      }

      const checkPassword = await bcrypt.compare(userPwd, user.userPwd);
      if (!checkPassword) {
        return {
          message: "Sai mật khẩu!",
          success: false,
        };
      }
    } else {
      const decodedUser = decodedToken(idToken);

      const queryRef = userRef.where("email", "==", decodedUser.email);

      const querySnapshot = await queryRef.get();

      const user = querySnapshot.docs[0];

      if (!user) {
        //mã hóa password
        const hashedPassword = await bcrypt.hash("123456789", 8);
        const newAccount = {
          userName: decodedToken.email,
          email: decodedToken.email,
          name: "Người dùng mới",
          phone: "",
          pwd: hashedPassword,
          address: "",
          birthDay: "",
        };

        const newId = await addUser(newAccount);
      }
    }

    return {
      message: "Đăng nhập thành công!",
      success: true,
      data: idToken,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "Oops! Có lỗi xảy ra!",
      success: false,
    };
  }
};

const findUserByIdAsync = async (id) => {
  try {
    const user = await USER.findOne({ _id: id });
    if (!user) {
      return {
        message: "Không tìm thấy người dùng hợp lệ!",
        success: false,
      };
    }
    return {
      message: "Tìm thành công",
      success: true,
      data: user,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "Oops! Có lỗi xảy ra!",
      success: false,
    };
  }
};

const changePasswordAsync = async (id, body) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = body;
    const user = await USER.findOne({ _id: id });
    const checkPassword = await bcrypt.compare(oldPassword, user.userPwd);
    if (!checkPassword) {
      return {
        message: "Sai mật khẩu cũ!",
        success: false,
        data: user,
      };
    }

    if (newPassword != confirmPassword) {
      return {
        message: "Nhập lại mật khẩu không khớp!",
        success: false,
        data: user,
      };
    }
    const newPwd = await bcrypt.hash(newPassword, 8);
    user.userPwd = newPwd;
    await user.save();
    return {
      message: "Đổi mật khẩu thành công!",
      success: true,
      data: user,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Oops! Có lỗi xảy ra!",
      success: false,
    };
  }
};

const fotgotPasswordAsync = async (body) => {
  try {
    const email = body.email;
    var otp = await otpGenerator.generate(5, {
      upperCase: false,
      specialChars: false,
      alphabets: false,
    });
    const result = await USER.findOneAndUpdate(
      { email: email },
      { otp: otp },
      { new: true }
    );
    if (result != null) {
      const mailOptions = {
        to: result.email,
        from: configEnv.Email,
        subject: "Quên mật khẩu ReviewGame",
        text:
          "Có vẻ như bạn đã quên mật khẩu ReviewGame và muốn lấy lại\n" +
          "Mã OTP của bạn là: " +
          result.otp +
          "\n" +
          "Nếu đó không phải là yêu cầu của bạn vui lòng bỏ qua email này!",
      };
      const resultSendMail = await sendMail(mailOptions);
      console.log(resultSendMail);
      if (!resultSendMail) {
        return {
          message: "Gửi mail không thành công!",
          success: false,
        };
      } else {
        return {
          message:
            "Gửi mail thành công! Vui lòng kiểm tra email để nhận mã otp!",
          success: true,
        };
      }
    } else {
      return {
        message: "Vui lòng kiểm tra email nhập vào!",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Internal Server Error",
      success: false,
    };
  }
};
const resetPasswordAsync = async (body) => {
  try {
    const { email, password, confirmPassword, otp } = body;
    let user = await USER.findOne({ email: email });
    if (user != null) {
      if (password != confirmPassword) {
        return {
          message: "Nhập lại mật khẩu không khớp!",
          success: false,
          data: user,
        };
      }
      if (otp == user.otp) {
        const hashedPassword = await bcrypt.hash(password, 8);
        user.userPwd = hashedPassword;
        user.otp = "";
        user.save();
        return {
          message: "Đổi mật khẩu thành công!",
          success: true,
        };
      } else {
        return {
          message: "Sai mã OTP!",
          success: false,
        };
      }
    } else {
      return {
        message: "Sai email đăng nhập!",
        success: false,
      };
    }
  } catch (error) {
    return {
      message: "Oops! Có lỗi xảy ra!" + error,
      success: false,
    };
  }
};

const _findUserByRoleAsync = async () => {
  try {
    const user = await USER.findOne({
      role: 0,
    });
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const changeInfoAsync = async (id, body) => {
  try {
    const { name, phone, gender, dateofBirth } = body;
    const user = await USER.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        //email: email,
        phone: phone,
        gender: gender,
        dateofBirth: dateofBirth,
      },
      { new: true }
    );
    if (user != null) {
      return {
        message: "Đổi thông tin thành công!",
        success: true,
        data: user,
      };
    } else {
      return {
        message: "Đổi thông tin không thành công!",
        success: false,
        data: user,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Oops! Có lỗi xảy ra!",
      success: false,
    };
  }
};

const getALLUserAsync = async () => {
  try {
    const users = await USER.find({ role: 0 });
    if (users.length == 0) {
      return {
        message: "Không có user trong hệ thống!",
        data: {},
        success: false,
      };
    } else {
      return {
        message: "Danh sách User",
        data: users,
        success: true,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Oops! Có lỗi xảy ra!",
      success: false,
    };
  }
};

const addUser = async (userData) => {
  const docRef = await db.collection("users").add({
    ...userData,
    createdAt: admin.firestore.FieldValue.serverTimestamp(), // thêm timestamp nếu cần
  });

  console.log("Đã thêm user với ID:", docRef.id);
  return docRef.id;
};

module.exports = {
  registerUserAsync,
  loginAsync,
  findUserByIdAsync,
  changePasswordAsync,
  fotgotPasswordAsync,
  resetPasswordAsync,
  _findUserByRoleAsync,
  changeInfoAsync,
  getALLUserAsync,
  addUser,
};
