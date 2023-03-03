import { IConfigService } from "../config";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IGetcourseAPI } from "./getcourse.api.interface";
import axios from "axios";

@injectable()
export class GetcourseAPI implements IGetcourseAPI {
  key: string;

  constructor(@inject(TYPES.IConfigService) private configService: IConfigService) {
    this.key = this.configService.get('GETCOURSE_KEY');
  }

  async getExportKey() {
    return axios.get(`https://monstersreels.online/pl/api/account/users?key=${this.key}&status=active`);
  }

  async exportUsers(exportId: number) {
    return axios.get(`https://monstersreels.online/pl/api/account/exports/${exportId}?key=${this.key}`);
  }
}
