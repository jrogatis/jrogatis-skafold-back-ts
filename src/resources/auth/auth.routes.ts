import { login, passcode, passwordRecovery, refresh } from "./auth.controller";
import { TRouter } from "@utils/models";
import { loginValidators, passcodeValidator, passwordRecoveryValidators, refreshValidators } from "./auth.validators";

const routes: TRouter = {
  resource: "auth",
  routes: [
    {
      path: "login",
      method: "post",
      handler: login,
      middlewares: [loginValidators]
    },
    {
      path: "refresh",
      method: "post",
      handler: refresh,
      middlewares: [refreshValidators]
    },
    {
      path: "password-recovery",
      method: "post",
      handler: passwordRecovery,
      middlewares: [passwordRecoveryValidators]
    },
    {
      path: "check-passcode/:passcode",
      method: "post",
      handler: passcode,
      middlewares: [passcodeValidator]
    }
  ]
};

export default routes;
