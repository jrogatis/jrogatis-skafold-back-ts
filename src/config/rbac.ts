import rbac from "@rbac/rbac";

const rbacConfig = { enableLogger: false };

const roles = {
  attendee: {
    can: [],
  },
  manager: {
    can: [
      "attendee:find",
      "attendee:list",
      "attendee:create",
      "attendee:update",
      "attendee:delete",
    ],
  },
  admin: {
    inherits: ["manager"],
    can: [
      "user:list",
      "user:create",
      "user:update",
      "user:delete",
      "user:list-managers",
    ],
  },
};

export const configuredRbac = rbac(rbacConfig)(roles);

export const checkPermission = (permission) => async (req, res, next) => {
  try {
    console.log(req.user);
    const havePermission = await configuredRbac.can(req.user?.role, permission);
    if (!havePermission) {
      return res.status(401).json("User without permission.");
    }
    return next();
  } catch (error) {
    return next(error);
  }
};