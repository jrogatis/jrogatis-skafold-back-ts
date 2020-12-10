import { checkPermission } from "@config/rbac";
import { createValidators } from "@resources/user/user.validators";
import { TRouter } from "@utils/models";
import passport from "passport";

import { create, findById, listManagers, me, remove } from "./user.controller";

const routes: TRouter = {
  resource: "users",
  routes: [
    {
      path: "me",
      method: "get",
      handler: me,
    },
    {
      path: "",
      method: "post",
      handler: create,
      middlewares: [
        passport.authenticate("jwt", { session: false }),
        createValidators,
        checkPermission("user:create"),
      ],
    },
    {
      path: "",
      method: "put",
      handler: me,
      middlewares: [
        passport.authenticate("jwt", { session: false }),
        createValidators,
        checkPermission("user:edit"),
      ],
    },
    {
      path: "/:id",
      method: "get",
      handler: findById,
      middlewares: [
        passport.authenticate("jwt", { session: false }),
        createValidators,
        checkPermission("user:find"),
      ],
    },
    {
      path: "/:id",
      method: "delete",
      handler: remove,
      middlewares: [
        passport.authenticate("jwt", { session: false }),
        createValidators,
        checkPermission("user:delete"),
      ],
    },
    {
      path: "managers",
      method: "get",
      handler: listManagers,
      middlewares: [
        passport.authenticate("jwt", { session: false }),
        createValidators,
        checkPermission("user:list-managers"),
      ],
    },
  ],
};

export default routes;
