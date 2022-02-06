import Joi from "joi";

const tagValidation = Joi.object({
  text: Joi.string().min(1).required(),
});

export { tagValidation };
