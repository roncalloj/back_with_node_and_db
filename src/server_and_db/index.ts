import http from 'http';
import yenv from 'yenv';
import app from './app';

const env = yenv();
const server = http.createServer(app);

server
	.listen(env.BACKEND_PORT)
	.on('listening', () =>
		console.log(`Server listening on port ${env.BACKEND_PORT}`)
	)
	.on('error', (err: any) => {
		console.error('Server error ', err);
		process.exit(1);
	});
