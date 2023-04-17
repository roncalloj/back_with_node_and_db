import { Application } from 'express';
import http from 'http';
import { AppService } from 'src/backend/app.service';
import yenv from 'yenv';
import IBootstrap from './interface.bootstrap';

const env = yenv();

export default class ServerBootstrap implements IBootstrap {
	constructor(private readonly app: Application) {}

	initialize() {
		return new Promise((resolve, reject) => {
			const server = http.createServer(this.app);

			server
				.listen(AppService.PORT)
				.on('listening', () => {
					console.log(`Server listening on port ${AppService.PORT}`);
					resolve(`Server listening on port ${AppService.PORT}`);
				})
				.on('error', (err: any) => {
					reject(err);
					console.error('Server error ', err);
					process.exit(1);
				});
		});
	}
	close(): void {
		process.exit(1);
	}
}
