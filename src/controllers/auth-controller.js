const { User } = require("../models");
const {
  validateRegister,
  validateLogin,
} = require("../validators/auth-validator");
const { Op } = require("sequelize");
const createError = require("../utils/create-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

////////////////////////////// REGISTER ///////////////////////////////////

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);
    // value = {userName, pw, firstName, lastName, phone, idCard}

    const user = await User.findOne({
      where: {
        [Op.or]: [
          { userName: value.userName },
          { phone: value.phone },
          { idCard: value.idCard },
        ],
      },
    });
    if (user) {
      createError("username or phone or idCard is already in use", 400);
    }

    value.password = await bcrypt.hash(value.password, 12);
    await User.create(value);
    res
      .status(201)
      .json({ message: "register success. please login to continue" });
  } catch (err) {
    next(err);
  }
};

////////////////////////////////// LOGIN ////////////////////////////////////////

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);

    // check username
    const user = await User.findOne({
      where: { userName: value.userName },
    });
    if (!user) {
      createError("invalid username or password", 400);
    }

    // check password
    const passwordCheck = await bcrypt.compare(value.password, user.password);
    if (!passwordCheck) {
      createError("invalid username or password", 400);
    }

    // sign token if login complete
    const accessToken = jwt.sign(
      {
        id: user.id,
        userName: user.userName,
        role: user.role,
      },
      "thisisSecretKey",
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

////////////////////////////////// GETME ////////////////////////////////////////
exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
