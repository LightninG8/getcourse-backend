import { App } from "./app";
import { Container, ContainerModule, interfaces } from "inversify";
import { TYPES } from "./types";
import { ILogger, LoggerService } from "./logger";
import { ConfigService, IConfigService } from "./config";
import { ExceptionFilter, IExceptionFilter } from "./errors";
import { GetcourseScheduler, IGetcourseScheduler } from "./schedulers";
import { DatabaseService, IDatabaseService, IUserService, UserService } from "./database";
import { GetcourseAPI, IGetcourseAPI } from "./api";
import { IUsersController, UsersController } from "./common";

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<App>(TYPES.Application).to(App).inSingletonScope();
  bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
  bind<IGetcourseScheduler>(TYPES.IGetcourseScheduler).to(GetcourseScheduler).inSingletonScope();
  bind<IDatabaseService>(TYPES.IDatabaseService).to(DatabaseService).inSingletonScope();
  bind<IGetcourseAPI>(TYPES.IGetcourseAPI).to(GetcourseAPI).inSingletonScope();
  bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
  bind<IUsersController>(TYPES.IUsersController).to(UsersController)

})


const bootstrap = async (): Promise<IBootstrapReturn> => {
  const appContainer = new Container();

  appContainer.load(appBindings);

  const app = appContainer.get<App>(TYPES.Application);

  await app.init();

  return { appContainer, app }
}

export const boot = bootstrap();

