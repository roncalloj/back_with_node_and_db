import { DataSource } from 'typeorm';

import { AppService, IDBConfig } from 'src/backend/app.service';
import IBootstrap from './interface.bootstrap';

let appDataSource: DataSource;

export default class implements IBootstrap {
	initialize(): Promise<any> {
		const dbConfig: IDBConfig = AppService.DB_CONFIG;

		const AppDataSource = new DataSource({
			type: 'mysql',
			...dbConfig,
			migrations: [],
			subscribers: [],
		});

		appDataSource = AppDataSource;
		return AppDataSource.initialize();
	}
	close(): void {
		appDataSource.destroy();
	}
}
