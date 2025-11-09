import Joi from "joi";

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string().min(2).max(20).required(),
  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  birthDate: Joi.date().required(),
});

export default signUpSchema;
