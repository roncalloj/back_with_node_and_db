import cors from 'cors';
import express from 'express';
import { RouterUsers } from '../modules/user/presentation/users.routes';

const routerUsers: RouterUsers = new RouterUsers();

class App {
	app: express.Application;

	constructor() {
		this.app = express();
		this.middlewares();
		this.mountRoutes();
	}
	middlewares(): void {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	mountRoutes(): void {
		this.app.use('/user', routerUsers.router);

		this.app.get('/products', (request, response) => {
			const product = [
				{ name: 'A', price: 10 },
				{ name: 'B', price: 20 },
			];
			response.json(product);
		});
	}
}

export default new App().app;
