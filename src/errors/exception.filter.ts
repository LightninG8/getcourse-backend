import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import 'reflect-metadata';
import { IExceptionFilter } from "./exception.filter.interface";
import { NextFunction, Request, Response } from "express";
import { HTTPError } from "./http-error.class";
import { ILogger } from "logger";


@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.logger = logger;
  }

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HTTPError) {
      this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);

      return res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`${err.message}`);

      res.status(500).send({err: err.message});
    }
  }
}