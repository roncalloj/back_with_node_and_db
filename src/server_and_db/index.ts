import app from './app';
import ServerBootstrap from './server.bootstrap';

try {
	const server = new ServerBootstrap(app);
	server.initialize();
} catch (error) {
	console.error(error);
	process.exit(1);
}
