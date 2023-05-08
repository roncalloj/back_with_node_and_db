import { Request, Response } from 'express';
import {
	UsersApplication,
	UsersInsertResultApplication,
} from '../application/users.application';
import { UsersFactory, UsersResult } from '../domain/users.factory';
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
		this.insert = this.insert.bind(this);
	}
	async insert(request: Request, response: Response) {
		console.log(request.body);
		const { name, lastname, email, password } = request.body;
		const userResult: UsersResult = UsersFactory.create(
			name,
			lastname,
			email,
			password
		);

		if (userResult.isErr()) {
			return response.status(400).json({
				name: userResult.error.name,
				message: userResult.error.message,
			});
		}

		const userInsertResult: UsersInsertResultApplication =
			await usersApplication.insert(userResult.value);

		if (userInsertResult.isErr()) {
			return response.status(userInsertResult.error.status).json({
				name: userInsertResult.error.name,
				message: userInsertResult.error.message,
			});
		}
		const userCreated = userInsertResult.value;
		response.status(201).json({ message: 'User created', userCreated });
	}

	async getAll(request: Request, response: Response) {
		const userResult = await usersApplication.getAll();

		if (userResult.isErr()) {
			return response.status(userResult.error.starus).json({
				name: userResult.error.name,
				message: userResult.error.message,
			});
		}
		response.json(userResult.value);
	}
}

export default UserController;
