import { UsersDomain } from '../domain/users-domain';
import { UsersRepository } from '../domain/users.repository';
import { UsersEntity } from './entities/users';
import { UsersGetAllDTO } from './users-getAll.dto';

export class UsersInfraestructure implements UsersRepository {
	insert(user: UsersDomain): void {
		throw new Error('Method not implemented.');
	}
	getAll(): UsersDomain[] {
		const results = [
			new UsersEntity('Jhon Smith', 'john@email.com', '123456'),
			new UsersEntity('Sam Smith', 'sam@email.com', '123456'),
			new UsersEntity('Mary Smith', 'mary@email.com', '123456'),
		];
		return UsersGetAllDTO.fromDataToDomain(results);
	}
}
