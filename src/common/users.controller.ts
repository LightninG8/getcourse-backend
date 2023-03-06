import { BaseController } from "./base.controller";
import { NextFunction, Request, Response } from "express";
import { injectable, inject } from 'inversify';
import { TYPES } from "../types";
import 'reflect-metadata';
import { ILogger } from "../logger";
import { ValidateMiddleware } from "../middlewares";
import { IncUserScoreDto, UserGetDto } from "../dto";
import { IUserService } from "../database";
import { IUsersController } from "./users.controller.interface";

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IUserService) private userService: IUserService,


  ) {
    super(logger);

    this.bindRoutes([
      {
        path: '/user',
        method: 'get',
        func: this.getUserByGetcourseId,
        middlewares: [new ValidateMiddleware(UserGetDto)]
      },
      {
        path: '/add-user-score',
        method: 'post',
        func: this.addUserScore,
        middlewares: [new ValidateMiddleware(IncUserScoreDto)]
      },
    ])
  }
  async getUserByGetcourseId(req: Request, res: Response, next: NextFunction) {
    try {  
      const result = await this.userService.getUserByGetcourseId(req.query as unknown as UserGetDto);
      
      if (!result) {
        return this.send(res, 401, {
          success: false,
          message: `Пользователь ${req.query.getcourse_id} не зарегистрирован`,
          data: {}
        })
      }

      this.ok(res, {
        success: true,
        message: `Данные пользователя ${req.query.getcourse_id} получены`,
        data: result
      })
    } catch (e) {
      return this.send(res, 500, {
        success: false,
        message: `Ошибка сервера. Повтроите запрос позднее. ${e}`,
        data: {}
      })
    }
  };

  async addUserScore(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.addUserScore(req.body);

      if (!result) {
        return this.send(res, 401, {
          success: false,
          message: `Ошибка запроса. Проверьте корректность введённых данных`,
          data: {}
        })
      }

      this.ok(res, {
        success: true,
        message: `Баллы добавлены пользователю ${req.body.getcourse_id}`,
        data: result
      });
    } catch(e) {
      return this.send(res, 500, {
        success: false,
        message: `Ошибка сервера. Повтроите запрос позднее. ${e}`,
        data: {}
      })
    }
    
  }
}
