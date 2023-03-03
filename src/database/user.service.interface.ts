import { Document } from "mongoose";
import { IncUserScoreDto, UserGetDto } from "../dto";
import { IUser } from "../models";

export interface IUserService {
  importUsers: (users: IUser[]) => void;
  getUserByGetcourseId: (query: UserGetDto) => Promise<any | null>;
  incUserScore: (body: IncUserScoreDto) => Promise<any | null>;
}
