import { Application } from 'express';
import http from 'http';
import yenv from 'yenv';
import IBootstrap from './interface.bootstrap';

const env = yenv();

export default class ServerBootstrap implements IBootstrap {
	constructor(private readonly app: Application) {}

	initialize() {
		return new Promise((resolve, reject) => {
			const server = http.createServer(this.app);

			server
				.listen(env.BACKEND_PORT)
				.on('listening', () => {
					console.log(`Server listening on port ${env.BACKEND_PORT}`);
					resolve(`Server listening on port ${env.BACKEND_PORT}`);
				})
				.on('error', (err: any) => {
					reject(err);
					console.error('Server error ', err);
					process.exit(1);
				});
		});
	}
}
