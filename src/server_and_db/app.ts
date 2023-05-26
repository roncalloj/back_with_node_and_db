import cors from 'cors';
import express from 'express';
import { RouterAuth } from '../modules/auth/presentation/auth.routes';
import { RouterUsers } from '../modules/user/presentation/users.routes';

const routerUsers: RouterUsers = new RouterUsers();
const routerAuth: RouterAuth = new RouterAuth();

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
		this.app.use('/auth', routerAuth.router);
	}
}

export default new App().app;
