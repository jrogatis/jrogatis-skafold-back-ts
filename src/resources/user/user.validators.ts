import Joi from "@shared/services/joi";
import { celebrate } from "celebrate";

export const findByIdValidators = celebrate({
  params: Joi.object({ id: Joi.objectId() })
});

export const createValidators = celebrate(
  {
    body: Joi.object({
      role: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    })
  },
  { abortEarly: false }
);
