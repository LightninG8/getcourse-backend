import { NextFunction, Request, Response } from "express";
import { IBaseController } from "./base.controller.interface";

export interface IUsersController extends IBaseController {
  getUserByGetcourseId: (req: Request, res: Response, next: NextFunction) => void;
  addUserScore: (req: Request, res: Response, next: NextFunction) => void;

}
