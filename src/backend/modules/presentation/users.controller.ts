import { Request, Response } from 'express';
import { UsersApplication } from '../application/users.application';
import { UsersRepository } from '../domain/users.repository';
import { UsersInfrastructure } from '../infrastructure/users.infrastructure';

const usersInfrastructure: UsersRepository = new UsersInfrastructure();
const usersApplication: UsersApplication = new UsersApplication(
	usersInfrastructure
);

class UserController {
	mockUsers() {
		return [
			{ name: 'User 1', age: 30 },
			{ name: 'User 2', age: 40 },
		];
	}

	constructor() {
		this.getAll = this.getAll.bind(this);
	}

	getAll(request: Request, response: Response) {
		response.json(usersApplication.getAll());
		// response.send('Response to GET from /users');
	}
}

export default UserController;
