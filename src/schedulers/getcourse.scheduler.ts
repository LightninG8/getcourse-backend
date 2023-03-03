import { inject, injectable } from "inversify";
import { ILogger } from "../logger";
import { TYPES } from "../types";
import { IGetcourseAPI } from "../api";
import axios from "axios";
import { getFormattedUsers } from "../utils";
import { IUserService } from "../database";
import { scheduleJob } from "node-schedule";


export interface IGetcourseScheduler {
  updateUsersDatabase: () => void;
}

@injectable()
export class GetcourseScheduler implements IGetcourseScheduler{
  name = 'Export from GetCourse';
  // cronDelay = '0 5 * * *';
  cronDelay = '0 * * * *';


  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IGetcourseAPI) private getcourseAPI: IGetcourseAPI,
    @inject(TYPES.IUserService) private userService: IUserService) {

  }

  async updateUsersDatabase() {
    // fake API
    await axios.get('http://localhost:8080/export.json').then((response) => {
      const users = getFormattedUsers(response.data.info);

      this.logger.log(users);

      this.userService.importUsers(users);
    });
    
    this.logger.log('[Scheduler] Users Database was updated');
  }

  start() {
    scheduleJob(this.cronDelay, () => this.updateUsersDatabase());

    this.logger.log(`[Scheduler] Планировщик ${this.name} запущен c частотой ${this.cronDelay}`)
  }
}

