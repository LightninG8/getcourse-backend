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
      const result = await UserModel.findOne(query).exec()

      return result;
    } catch (e) {
      return null;
    }
  }

  async addUserScore(body: IncUserScoreDto) {
    try {
      const user = await this.getUserByGetcourseId({getcourse_id: body.getcourse_id});

      if (!user) {
        return null;
      }

      const club_experience = String(+user.addfields.club_experience + body.score);
      const club_score = String(+user.addfields.club_score + body.score);
        
      await UserModel.updateOne({getcourse_id: body.getcourse_id}, { "addfields.club_score": club_score, "addfields.club_experience": club_experience }).exec();

      return await this.getUserByGetcourseId({getcourse_id: body.getcourse_id});
    } catch (e) {
      return null;
    }
  }
}
