const { WeightHeight } = require("../models");
const createError = require("../utils/create-error.js");
const { validateData } = require("../validators/data-validate");

exports.getMyData = async (req, res, next) => {
  try {
    const myData = await WeightHeight.findAll({
      where: {
        userId: req.user.id,
      },
    });

    res.status(200).json(myData);
  } catch (err) {
    next(err);
  }
};

exports.createData = async (req, res, next) => {
  try {
    const value = validateData(req.body);
    value.userId = req.user.id;

    const myData = await WeightHeight.create(value);
    res.status(201).json(myData);
  } catch (err) {
    next(err);
  }
};

exports.deleteData = async (req, res, next) => {
  try {
    const myData = await WeightHeight.findOne({
      where: { id: req.params.dataId },
    });

    if (!myData) {
      createError("this data was not found", 400);
    }
    if (myData.userId !== req.user.id) {
      createError("you have no permission to delete this data", 403);
    }
    await myData.destroy();
    res.status(200).json(myData);
  } catch (err) {
    next(err);
  }
};

exports.updateData = async (req, res, next) => {
  try {
    const value = req.body;

    const newData = await WeightHeight.update(value, {
      where: { id: req.params.dataId, userId: req.user.id },
    });
    res.status(201).json(newData);
  } catch (err) {
    next(err);
  }
};
