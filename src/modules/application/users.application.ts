import { Result, err, ok } from 'neverthrow';
import { UsersDomain } from '../domain/users-domain';
import { UsersRepository } from '../domain/users.repository';
import { UsersInsertDTO } from './users-insert.dto';
import { UsersListResultApp } from './users-list.result';

export type UsersInsertResultApplication = Result<UsersInsertDTO, any>;
export type UsersListResultApplication = Result<UsersListResultApp[], any>;

export class UsersApplication {
	private repository: UsersRepository;
	constructor(repository: UsersRepository) {
		this.repository = repository;
	}
	async getAll(): Promise<UsersListResultApplication> {
		const listResult = await this.repository.getAll();

		if (listResult.isErr()) {
			return err(listResult.error);
		}
		return ok(listResult.value);
	}
	async insert(user: UsersDomain): Promise<UsersInsertResultApplication> {
		const userResult = await this.repository.insert(user);
		if (userResult.isErr()) {
			return err(userResult.error);
		}
		return ok(UsersInsertDTO.fromResponseToPresentation(userResult.value));
	}
}
