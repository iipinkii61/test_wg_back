const Joi = require("joi");
const validate = require("./validate");

const dataSchema = Joi.object({
  weight: Joi.number().positive().less(150).required(),
  height: Joi.number().positive().less(250).required(),
  waist: Joi.number().positive().required(),
  date: Joi.date().greater("1-1-1920").required(),
});

exports.validateData = validate(dataSchema);
