import app from './app';
import DataBaseBootstrap from './db.bootstrap';
import ServerBootstrap from './server.bootstrap';

(async () => {
	const server = new ServerBootstrap(app);
	const database = new DataBaseBootstrap();

	try {
		const listPromises = [server.initialize(), database.initialize()];
		await Promise.all(listPromises);

		console.log('DB is running');
	} catch (error) {
		console.error(error);
		database.close();
		server.close();
	}
})();
