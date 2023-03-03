import { AxiosPromise } from "axios";

export interface IGetcourseAPI {
  getExportKey: () => AxiosPromise;
  exportUsers: (exportId: number) => AxiosPromise
}
