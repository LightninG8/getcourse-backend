import express, { Express } from 'express';
import { inject, injectable } from "inversify";
import { Server } from 'http';
import { TYPES } from './types';
import cors from 'cors';
import { json } from 'body-parser';
import 'reflect-metadata';
import { ILogger } from './logger';
import { IExceptionFilter } from './errors';
import { GetcourseScheduler } from './schedulers';
import { DatabaseService } from './database';
import { IUsersController } from 'common';



@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,

    @inject(TYPES.IUsersController) private usersController: IUsersController,

    @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,

    @inject(TYPES.IGetcourseScheduler) private getcourseService: GetcourseScheduler,
    @inject(TYPES.IDatabaseService) private databaseService: DatabaseService


  ) {
    this.app = express();
    this.port = 8080;
  }

  useRoutes() {
    this.app.use('/api/v1', this.usersController.router);
  }

  useSchedulers() {
    this.getcourseService.start();
  }

  useMiddleware() {
    this.app.use(json());
    this.app.use(cors());
    this.app.use(express.static('public'))
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  async useDatabase() {
    await this.databaseService.connect();
  }


  public async init() {
    await this.useDatabase();

    this.useMiddleware();
    this.useRoutes()
    this.useExceptionFilters();
    this.useSchedulers();
    
    this.server = await this.app.listen(this.port, () => {
      this.logger.log(`[App] Сервер запущен на  https://localhost:${this.port}`)
    })
  }
}
