import { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import parser from "body-parser";
import passport from "passport";
export default (app: Express) => {
  app.use(helmet());
  app.use(parser.urlencoded({ extended: true }));
  app.use(parser.json());
  app.use(cors({ optionsSuccessStatus: 200 }));
  app.use(passport.initialize());
  app.options('*', cors());
};
