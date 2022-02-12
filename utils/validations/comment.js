import Joi from "joi";

const createCommentValidation = Joi.object({
  origin: Joi.string().required(),
  article: Joi.string().required(),
  text: Joi.string().min(1).required(),
});

export { createCommentValidation };
