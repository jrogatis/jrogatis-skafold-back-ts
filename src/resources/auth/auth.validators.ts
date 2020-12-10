import Joi from "@shared/services/joi";
import { celebrate } from "celebrate";

export const loginValidators = celebrate(
  {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    })
  },
  { abortEarly: false }
);

export const refreshValidators = celebrate(
  {
    body: Joi.object({
      refreshToken: Joi.string().required()
    })
  },
  { abortEarly: false }
);


export const passwordRecoveryValidators = celebrate(
  {
    body: Joi.object({
      email: Joi.string().required()
    })
  },
  { abortEarly: false }
);



export const passcodeValidator = celebrate(
  {
    params: Joi.object({
      passcode: Joi.string().required()
  })
  },
  { abortEarly: false }
);
