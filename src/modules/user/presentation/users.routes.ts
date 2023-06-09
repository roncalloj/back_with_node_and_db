import express from 'express';
import { AuthenticationMiddleWare } from '../../../core/auth.middleware';
import UserController from './users.controller';

export class RouterUsers {
	router: express.Router;
	controller: UserController;
	authentication: AuthenticationMiddleWare;

	constructor() {
		this.router = express.Router();
		this.controller = new UserController();
		this.authentication = new AuthenticationMiddleWare();
		this.mountRoutes();
	}

	mountRoutes(): void {
		this.router.get(
			'/users',
			this.authentication.authenticate,
			this.controller.getAll
		);
		this.router.post('/signup', this.controller.insert);
		this.router.get('/:idUser', this.controller.getOne);
		this.router.put('/:idUser', this.controller.update);
		this.router.delete('/:idUser', this.controller.delete);
	}
}
