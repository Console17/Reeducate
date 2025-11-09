import Joi from "joi";

const createBlogSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  content: Joi.string().min(10).required(),
});

export default createBlogSchema;
