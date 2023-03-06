import { injectable } from "inversify";
import { IUser, UserModel } from "../models";
import { IUserService } from "./user.service.interface";
import _ from 'lodash';
import { IncUserScoreDto, UserGetDto } from "../dto";


@injectable()
export class UserService implements IUserService {
  async importUsers(users: IUser[]) {
    try {  
      for(const user of users) {
        const filter = { getcourse_id: user.getcourse_id };
        const dbUser = await UserModel.findOne(filter);
        const isUserExists = Boolean(dbUser);

        if (isUserExists) {
          if (!_.isEqual(user, dbUser)) {
            await UserModel.updateOne(filter, user);
          }
        } else {
          await UserModel.insertMany([user]);
        }
      }
      
    } catch (e) {
      return null;
    }
  }

  async getUserByGetcourseId(query: UserGetDto) {
    try {
      const result = await UserModel.findOne({'getcourse_id': '242756552'})

      return result;
    } catch (e) {
      return null;
    }
  }

  async addUserScore(body: IncUserScoreDto) {
    try {
      return await UserModel.updateOne({getcourse_id: body.getcourse_id}, { $inc: { "addfields.club_score": body.score, "addfields.club_experience": body.score } });
    } catch (e) {
      return null;
    }
  }
}
