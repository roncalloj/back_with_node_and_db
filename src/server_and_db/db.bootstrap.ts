import { DataSource } from 'typeorm';
import { AppService, IDBConfig } from '../backend/core/app.service';
import IBootstrap from './interface.bootstrap';

export default class DataBaseBootstrap implements IBootstrap {
	private static appDataSource: DataSource;

	initialize(): Promise<any> {
		const dbConfig: IDBConfig = AppService.DB_CONFIG;

		const AppDataSource = new DataSource({
			type: 'mysql',
			...dbConfig,
			migrations: [],
			subscribers: [],
		});

		DataBaseBootstrap.appDataSource = AppDataSource;
		return AppDataSource.initialize();
	}

	close(): void {
		DataBaseBootstrap.appDataSource?.destroy();
	}

	static get dataSource(): DataSource {
		return DataBaseBootstrap.appDataSource;
	}
}
