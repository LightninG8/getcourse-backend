import { IsInt, IsString } from 'class-validator';

export class UserGetDto {
  @IsString({ message: 'Неверно указан getcourse_id'})
  getcourse_id: number;
}

export class IncUserScoreDto {
  @IsString({ message: 'Неверно указан getcourse_id'})
  getcourse_id: number;

  @IsInt({ message: 'Неверно указано количество баллов'})
  score: number;
}
