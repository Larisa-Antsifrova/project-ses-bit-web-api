const Joi = require("joi");

const schemaRegisterUser = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string().min(8).required(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string().min(8).required(),
});

const validateRequestAgainstSchema = async (schema, request, next) => {
  try {
    await schema.validateAsync(request);
    next();
  } catch (error) {
    next({
      status: 400,
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
