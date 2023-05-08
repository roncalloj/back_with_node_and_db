import express from 'express';
import UserController from './users.controller';

export class RouterUsers {
	router: express.Router;
	controller: UserController;

	constructor() {
		this.router = express.Router();
		this.controller = new UserController();
		this.mountRoutes();
	}

	mountRoutes(): void {
		this.router.get('/users', this.controller.getAll);
		this.router.post('/signup', this.controller.insert);
	}
}
