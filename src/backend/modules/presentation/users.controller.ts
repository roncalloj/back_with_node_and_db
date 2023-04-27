import { Request, Response } from 'express';
import {
	UsersApplication,
	UsersInsertResultApplication,
} from '../application/users.application';
import { UsersFactory } from '../domain/users.factory';
import { UsersRepository } from '../domain/users.repository';
import {
	UsersInfrastructure,
	UsersInsertResult,
} from '../infrastructure/users.infrastructure';

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
		this.insert = this.insert.bind(this);
	}
	async insert(request: Request, response: Response) {
		const { name, lastname, email, password } = request.body;
		const userToInsert = UsersFactory.create(name, lastname, email, password);
		const userResult: UsersInsertResultApplication =
			await usersApplication.insert(userToInsert);

		if (userResult.isErr()) {
			return response.status(userResult.error.status).json({
				name: userResult.error.name,
				message: userResult.error.message,
			});
		}
		const userCreated = userResult.value;
		response.status(201).json({ message: 'User created', userCreated });
	}

	getAll(request: Request, response: Response) {
		response.json(usersApplication.getAll());
	}
}

export default UserController;
