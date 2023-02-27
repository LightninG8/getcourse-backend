import { App } from "./app";
import { Container, ContainerModule, interfaces } from "inversify";
import { TYPES } from "./types";
import { ILogger, LoggerService } from "./logger";
import { ConfigService, IConfigService } from "./config";
import { ExceptionFilter, IExceptionFilter } from "./errors";
import { GetcourseScheduler, IGetcourseScheduler, ISchedulerService, SchedulerService } from "./schedulers";
import { DatabaseService, IDatabaseService } from "./database";

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<App>(TYPES.Application).to(App).inSingletonScope();
  bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
  bind<ISchedulerService>(TYPES.ISchedulerService).to(SchedulerService).inSingletonScope();
  bind<IGetcourseScheduler>(TYPES.IGetcourseScheduler).to(GetcourseScheduler).inSingletonScope();
  bind<IDatabaseService>(TYPES.IDatabaseService).to(DatabaseService).inSingletonScope();
})


const bootstrap = async (): Promise<IBootstrapReturn> => {
  const appContainer = new Container();

  appContainer.load(appBindings);

  const app = appContainer.get<App>(TYPES.Application);

  await app.init();

  return { appContainer, app }
}

export const boot = bootstrap();

