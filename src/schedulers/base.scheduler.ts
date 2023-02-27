import { inject, injectable } from "inversify";
import { ILogger } from "../logger";
import { TYPES } from "../types";
import { ISchedulerService } from "./base.scheduler.interface";
import { IScheduler } from "./scheduler.interface";

@injectable()
export class SchedulerService implements ISchedulerService {
  schedulers: IScheduler[];

  private timerId: ReturnType<typeof setInterval>;

  constructor(private loggerService: ILogger) {
  }

  bindSchedulers(schedulers: IScheduler[]) {
    this.schedulers = schedulers;
  }

  start() {
    for (const scheduler of this.schedulers) {
      // TODO: switch to setInterval
      this.timerId = setTimeout(scheduler.func, scheduler.delay);

      this.loggerService.log(`[Scheduler] Планировщик ${scheduler.name} запущен`)
    }
    
  }

  stop() {
    clearInterval(this.timerId);

    this.loggerService.log(`[Scheduler] Планировщик остановлен`)
  }


}
