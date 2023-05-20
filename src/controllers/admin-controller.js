const { Op } = require("sequelize");
const { WeightHeight, User } = require("../models");
const createError = require("../utils/create-error.js");

exports.getAllUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      createError("You have no permission to access this");
    }
    const userInfo = await User.findAll({
      where: {
        role: {
          [Op.not]: "admin",
        },
      },
      include: [
        {
          model: WeightHeight,
          attributes: {
            exclude: ["createdAt", "updatedAt", "userId"],
          },
        },
      ],
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "role"],
      },
    });
    res.status(200).json(userInfo);
  } catch (err) {
    next(err);
  }
};

exports.getAllData = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      createError("You have no permission to access this");
    }
    const allData = await WeightHeight.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "role"],
          },
        },
      ],
    });
    res.status(200).json(allData);
  } catch (err) {}
};

exports.deleteUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      createError("You have no permission to access this");
    }
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      createError("this user was not found", 400);
    }

    await user.destroy();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
