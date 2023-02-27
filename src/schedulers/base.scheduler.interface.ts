import { IScheduler } from "./scheduler.interface";

export interface ISchedulerService {
  bindSchedulers: (schedulers: IScheduler[]) => void;
  start: () => void;
  stop: () => void;
}
