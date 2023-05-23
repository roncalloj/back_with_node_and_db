import { Request, Response } from 'express';
import {
	UsersApplication,
	UsersInsertResultApplication,
} from '../application/users.application';
import { RoleRepository } from '../domain/role.repository';
import { UserUpdateProperties } from '../domain/users-domain';
import { UsersFactory, UsersResult } from '../domain/users.factory';
import { UsersRepository } from '../domain/users.repository';
import { RoleInfrastructure } from '../infrastructure/role.infrastructure';
import { UsersInfrastructure } from '../infrastructure/users.infrastructure';

const usersInfrastructure: UsersRepository = new UsersInfrastructure();
const roleInfrastructure: RoleRepository = new RoleInfrastructure();
const usersApplication: UsersApplication = new UsersApplication(
	usersInfrastructure,
	roleInfrastructure
);

class UserController {
	mockUsers() {
		return [
			{ name: 'User 1', age: 30 },
			{ name: 'User 2', age: 40 },
		];
	}

	constructor() {
		this.insert = this.insert.bind(this);
		this.getAll = this.getAll.bind(this);
		this.getOne = this.getOne.bind(this);
		this.update = this.update.bind(this);
	}
	async insert(request: Request, response: Response) {
		console.log(request.body);
		const { name, lastname, email, password, roles } = request.body;
		const userResult: UsersResult = UsersFactory.create(
			name,
			lastname,
			email,
			password,
			roles
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

	async getOne(request: Request, response: Response) {
		const { idUser } = request.params;
		const userResult = await usersApplication.getOne(idUser);

		if (userResult.isErr()) {
			return response.status(userResult.error.starus).json({
				name: userResult.error.name,
				message: userResult.error.message,
			});
		}
		response.json(userResult.value);
	}

	async update(request: Request, response: Response) {
		const { idUser } = request.params;
		console.log(request.body);
		const body: Partial<UserUpdateProperties> = request.body;

		const userFound = await usersApplication.getOneWithPsswd(idUser);
		if (userFound.isErr()) {
			return response.status(userFound.error.status).json({
				name: userFound.error.name,
				message: userFound.error.message,
			});
		}

		const userUpdateResult = await usersApplication.update(
			userFound.value,
			body
		);
		if (userUpdateResult.isErr()) {
			return response.status(userUpdateResult.error.status).json({
				name: userUpdateResult.error.name,
				message: userUpdateResult.error.message,
			});
		}

		response.status(201).json({ message: 'User updated' });
	}
}

export default UserController;
