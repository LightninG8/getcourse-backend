import { NextFunction, Request, Response } from "express";

export interface IMiddleware {
	execute: (req: Request, res: Response, next: NextFunction) => void;
}

export interface IValidateMiddleware {
  execute: (req: Request, res: Response, next: NextFunction) => void
}
