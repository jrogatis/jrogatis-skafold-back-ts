import { Express } from "express";
import joiErrors from "@middleware/custom/joiErrors";
import { errors } from "celebrate";

export default (app: Express) => {
  app.use(joiErrors());
  app.use(errors());
};
