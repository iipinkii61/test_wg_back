// const { Op } = require("sequelize");
const { WeightHeight, User } = require("../models");
const createError = require("../utils/create-error.js");

exports.getDataByUserId = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      createError("You have no permission to access this");
    }
    const userData = await User.findAll({
      where: { id: req.params.userId },
      include: [
        {
          model: WeightHeight,
        },
      ],
      attributes: {
        exclude: ["status", "password"],
      },
    });
    res.status(200).json(userData);
  } catch (err) {
    next(err);
  }
};
