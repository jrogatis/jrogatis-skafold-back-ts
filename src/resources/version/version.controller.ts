import { Request, Response } from 'express';
import pkg from '../../../package.json';

export const ver = (req: Request, res: Response): void => {
  res.send(`version: ${pkg.version}`);
};
