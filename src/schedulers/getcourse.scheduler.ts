import { inject, injectable } from "inversify";
import { ILogger } from "../logger";
import { TYPES } from "../types";
import { ISchedulerService } from "./base.scheduler.interface";
import { SchedulerService } from "./base.scheduler";
import { IConfigService } from "config";
import axios from "axios";

export interface IGetcourseScheduler extends ISchedulerService {
  key: string;
  updateUsersDatabase: () => void;
}

@injectable()
export class GetcourseScheduler extends SchedulerService implements IGetcourseScheduler{
  key: string;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IConfigService) private configService: IConfigService) {
    super(logger);

    this.key = this.configService.get('GETCOURSE_KEY')

    this.bindSchedulers([
      {
        name: 'Export from GetCourse',
        delay: 1 * 1000,
        func: () => this.updateUsersDatabase(),
      }
    ])

  }

  updateUsersDatabase() {
    axios.get(`https://monstersreels.online/pl/api/account/users?key=${this.key}&status=active`).then((data) => {
      console.log(data.data);
    })
    this.logger.log('[Scheduler] Users Database was updated');
  }

}

16429685
