import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import mongoose, { ConnectOptions } from 'mongoose';
import { IDatabaseService } from './database.service.interface';
import { ILogger } from '../logger';
import { IConfigService } from '../config';

@injectable()
export class DatabaseService implements IDatabaseService {
  private databaseUri: string;

	constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IConfigService) private configService: IConfigService,
  ) {
    this.databaseUri = this.configService.get('MONGODB_URI');
	}

	async connect() {
    mongoose.connect(this.databaseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
      .then(() => {
        this.logger.log(`[DatabaseService] База данных подключена`)
      })
      .catch((e) => {
        this.logger.error(`[DatabaseService] Ошибка подключения к базе данных ${e.message}`)
      })
	}

  async disconnect() {
    mongoose.connection.close()
      .then(() => {
        this.logger.log(`[DatabaseService] База данных отключена`)
      })
      .catch((e) => {
        this.logger.error(`[DatabaseService] Ошибка отключения от базы данных ${e.message}`)
      });
  }
}
