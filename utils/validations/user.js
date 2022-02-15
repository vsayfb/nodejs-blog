import Joi from "joi";

const createUserValidate = Joi.object({
  name: Joi.string().min(2).required(),
  displayName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  role: Joi.allow(),
  password: Joi.string().min(4).max(16).required(),
});

export { createUserValidate };
