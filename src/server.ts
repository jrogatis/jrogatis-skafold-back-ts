import  "dotenv/config";
import express from "express";
import passport from "passport";
import { applyRoutes } from "./utils";
import routes from "./routes";
import applyMiddlewares from "@middleware/index";
import applyErrorsMiddlewares from "@middleware/errors";
import configPassport from "@config/passport";
import configMongodb from "@config/mongodb";
import printRoutes from "@utils/printRoutes";

const app = express();

configPassport(passport);
configMongodb();
applyMiddlewares(app);
applyRoutes(routes, app);
applyErrorsMiddlewares(app);
printRoutes(app)

export default app;
