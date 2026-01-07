import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  photo: Joi.string().uri().required(),
  category: Joi.string().required(),
});
