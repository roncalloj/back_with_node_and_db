import express from 'express';
import AuthController from './auth.controller';

export class RouterAuth {
	router: express.Router;
	controller: AuthController;

	constructor() {
		this.router = express.Router();
		this.controller = new AuthController();
		this.mountRoutes();
	}

	mountRoutes(): void {
		this.router.post('/login', this.controller.login);
		this.router.post('/refresh', this.controller.getNewAccToken);
	}
}
