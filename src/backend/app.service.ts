import yenv from 'yenv';

export interface IDBConfig {
	host: string;
	port: number;
	entities: string[];
	username: string;
	password: string;
	database: string;
	synchronization: string;
	logging: boolean;
}

export class AppService {
	private static readonly env = yenv();

	public static get PORT(): number {
		return this.env.BACKEND_PORT;
	}

	public static get DB_CONFIG(): IDBConfig {
		return {
			host: this.env.DB_HOST,
			port: this.env.DB_PORT,
			entities: [this.env.DB_ENTITIES],
			username: this.env.DB_USER,
			password: '' + this.env.DB_PASS,
			database: this.env.DB_NAME,
			synchronization: this.env.DB_SYNC,
			logging: this.env.DB_LOGG,
		};
	}
}
