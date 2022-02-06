import Joi from "joi";

const createArticleValidate = Joi.object({
  displayTitle: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
  author: Joi.string().min(1).required(),
  tags: Joi.allow(),
});

export { createArticleValidate };
