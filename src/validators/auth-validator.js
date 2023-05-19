const Joi = require("joi");
const validate = require("./validate");

////////////////////////////// REGISTER ///////////////////////////////////

const registerSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required().trim().messages({
    "string.empty": "username is required",
    "any.required": "username is required", // ถ้าไม่ได้ส่ง key เข้ามาเลย
    "string.alphanum": "username should not contain any special character",
    "string.min": "username must have at least 3 characters",
  }),
  password: Joi.string().alphanum().min(6).required().trim().messages({
    "string.empty": "password is required",
    "any.required": "password is required",
    "string.alphanum": "password should not contain any special character",
    "string.min": "password must have at least 6 characters",
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .trim()
    .messages({
      "any.only": "password and confirm did not match",
      "any.required": "confirm password is required",
      "string.empty": "confirm password is required",
    })
    .strip(),
  firstName: Joi.string().trim().required().messages({
    "string.empty": "first name is required",
    "any.required": "first name is required",
    "string.base": "first name must be a string",
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "last name is required",
    "any.required": "last name is required",
    "string.base": "last name must be a string",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .trim()
    .messages({
      "string.empty": "phone is required",
      "any.required": "phone is required",
      "string.base": "phone must be a string",
    }),
  idCard: Joi.string().length(13).trim().required().messages({
    "string.empty": "idCard number is required",
    "any.required": "idCard number is required",
    "string.length": "idCard number must be 13 characters long",
  }),
  // role: Joi.string().trim(),
});

exports.validateRegister = validate(registerSchema);

////////////////////////////////// LOGIN ////////////////////////////////////////

const loginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});
exports.validateLogin = validate(loginSchema);

//////////////////////////////////////////////////////////////////////////
