import { UserDoc } from "@resources/user/user.model";
import { Router, Request, Response, NextFunction } from "express";

export type Wrapper = (router: Router) => void;

interface CustomRequest<B> extends Request {
  body: B;
  user: UserDoc
}

export type THandler<B = any> = (
  req: CustomRequest<B>,
  res: Response,
  next: NextFunction
) =>
  | Promise<void>
  | Promise<Response>
  | Promise<boolean>
  | Promise<void | Response>
  | Promise<boolean | Response>
  | void
  | boolean;

export type TRoute = {
  path: string;
  method: string;
  handler: THandler | THandler[];
  middlewares?: { (req, res, next): any | void }[];
};

export type TRouter = {
  resource: string;
  routes: TRoute[];
};
