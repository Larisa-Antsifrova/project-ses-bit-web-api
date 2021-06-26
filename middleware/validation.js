const Joi = require("joi");
const { HttpCodes } = require("../helpers/constants");

const schemaRegisterUser = Joi.object({
  name: Joi.string().trim().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string().trim().min(8).required(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateRequestAgainstSchema = async (schema, request, next) => {
  try {
    await schema.validateAsync(request);
    next();
  } catch (error) {
    next({
      status: HttpCodes.BAD_REQUEST,
      message: error.message.replace(/"/g, ""),
    });
  }
};

const validateRegisterUser = (req, res, next) => {
  return validateRequestAgainstSchema(schemaRegisterUser, req.body, next);
};

const validateLoginUser = (req, res, next) => {
  return validateRequestAgainstSchema(schemaLoginUser, req.body, next);
};

module.exports = { validateRegisterUser, validateLoginUser };
