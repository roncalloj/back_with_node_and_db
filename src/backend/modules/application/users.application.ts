import { Result, err, ok } from 'neverthrow';
import { UsersDomain } from '../domain/users-domain';
import { UsersRepository } from '../domain/users.repository';
import { UsersInsertDTO } from './users-insert.dto';

export type UsersInsertResultApplication = Result<UsersInsertDTO, any>;

export class UsersApplication {
	private repository: UsersRepository;
	constructor(repository: UsersRepository) {
		this.repository = repository;
	}
	getAll(): UsersDomain[] {
		return this.repository.getAll();
	}
	async insert(user: UsersDomain): Promise<UsersInsertResultApplication> {
		const userResult = await this.repository.insert(user);
		if (userResult.isErr()) {
			return err(userResult.error);
		}
		return ok(UsersInsertDTO.fromResponseToPresentation(userResult.value));
	}
}
