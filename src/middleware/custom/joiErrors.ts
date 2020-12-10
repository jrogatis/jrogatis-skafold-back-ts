import { isCelebrateError } from "celebrate";
import { Request, Response, NextFunction } from "express";

interface ResponseError extends Error {
  joi: {
    details: [];
    message: string;
  };
  meta;
}

export default () => (
  err: ResponseError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!isCelebrateError(err)) {
    return next(err);
  }

  const result = {
    error: "Bad Request",
    validation: {},
  };

  if (err.details) {
    Array.from(err.details).forEach(([error, data]) => {
      result.validation[error] = data.details
    });
  }
  
  return res.status(400).json(result);
};
