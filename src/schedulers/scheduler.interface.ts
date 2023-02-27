export interface IScheduler {
  name: string;
  delay: number;
  func: () => void;
}
