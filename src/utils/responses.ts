import { Response } from "express";

export const Unauthorized = (res: Response) =>
  res.status(401).json("Unauthorized");

export const Invalid = (res: Response) =>
  res.status(404).send("Invalid request");
